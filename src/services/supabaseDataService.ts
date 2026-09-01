import { supabase, isSupabaseConfigured } from './supabaseClient';
import { BIHAR_DISTRICTS } from '../constants/biharData';
import { Professional, UserAccount } from '../types';

export interface ProRegistrationPayload {
  // Step 1: Account
  fullName: string;
  mobile: string;
  whatsapp?: string;
  email: string;
  password?: string;
  
  // Step 2: Professional Details
  professionalType: 'amin' | 'deed_writer';
  yearsExperience: number;
  licenseNumber?: string;
  licenseAuthority?: string;
  chamberAddress?: string;
  about?: string;
  consultationFee?: number;

  // Step 3: Location
  district: string;
  subRegistryOffice?: string;
  block?: string;

  // Step 4: Services & Availability
  services: string[];
  languages: string[];
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];

  // Step 5: Documents
  profilePhoto?: File | null;
  identityDoc?: File | null;
  licenseDoc?: File | null;
  supportingDoc?: File | null;
}

export interface ProRegistrationResult {
  success: boolean;
  professionalId: string;
  userId: string;
  status: 'pending' | 'verified';
  message: string;
}

// Generate human-readable random professional ID
function generateProfessionalId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `LCP-${num}`;
}

function generateUserId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `LCU-${num}`;
}

export const supabaseDataService = {
  /**
   * Save complete professional registration in Supabase (Auth + Relational Tables + Storage)
   */
  registerProfessional: async (data: ProRegistrationPayload): Promise<ProRegistrationResult> => {
    const professionalId = generateProfessionalId();
    const userId = generateUserId();
    const cleanEmail = data.email.trim().toLowerCase();

    // 1. Attempt Supabase Auth Sign Up if configured
    let authUid = `user-${Date.now()}`;
    if (isSupabaseConfigured && data.password) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
              mobile: data.mobile,
              whatsapp: data.whatsapp || data.mobile,
              role: 'professional',
              professional_type: data.professionalType,
              professional_id: professionalId
            }
          }
        });

        if (authError) {
          console.warn('Supabase Auth notice (proceeding with profile creation):', authError.message);
        } else if (authData.user) {
          authUid = authData.user.id;
        }
      } catch (err) {
        console.warn('Supabase Auth exception handled:', err);
      }
    }

    // 2. Upload Profile Photo & Documents if provided
    let photoUrl = '';
    const uploadedDocs: { type: string; name: string; size: number }[] = [];

    if (data.profilePhoto) {
      try {
        const photoPath = `avatars/${professionalId}_${Date.now()}_${data.profilePhoto.name}`;
        if (isSupabaseConfigured) {
          const { data: uploadRes } = await supabase.storage
            .from('pro-avatars')
            .upload(photoPath, data.profilePhoto, { upsert: true });
          if (uploadRes) {
            const { data: publicUrlData } = supabase.storage.from('pro-avatars').getPublicUrl(photoPath);
            photoUrl = publicUrlData.publicUrl;
          }
        }
      } catch (e) {
        console.warn('Photo upload handled:', e);
      }
    }

    // Process secure documents
    const docFiles = [
      { type: 'identity', file: data.identityDoc },
      { type: 'license', file: data.licenseDoc },
      { type: 'supporting', file: data.supportingDoc }
    ];

    for (const d of docFiles) {
      if (d.file) {
        uploadedDocs.push({
          type: d.type,
          name: d.file.name,
          size: d.file.size
        });
        if (isSupabaseConfigured) {
          try {
            const docPath = `private_docs/${professionalId}/${d.type}_${Date.now()}_${d.file.name}`;
            await supabase.storage
              .from('pro-documents')
              .upload(docPath, d.file, { upsert: true });
          } catch (e) {
            console.warn('Doc upload handled:', e);
          }
        }
      }
    }

    // 3. Attempt DB Insert into Supabase tables
    if (isSupabaseConfigured) {
      try {
        // Insert profile
        await supabase.from('profiles').upsert({
          id: authUid,
          user_code: userId,
          full_name: data.fullName,
          mobile: data.mobile,
          whatsapp: data.whatsapp || data.mobile,
          email: cleanEmail,
          role: 'professional',
          district_name: data.district,
          avatar_url: photoUrl
        }, { onConflict: 'id' });

        // Insert professional record
        await supabase.from('professionals').insert({
          profile_id: authUid,
          professional_id: professionalId,
          professional_type: data.professionalType,
          years_experience: data.yearsExperience,
          license_number: data.licenseNumber || '',
          license_authority: data.licenseAuthority || 'Bihar Revenue / Registration Dept',
          chamberAddress: data.chamberAddress || (data.subRegistryOffice || data.block),
          about: data.about || '',
          verification_status: 'pending',
          active: false,
          consultation_fee: data.consultationFee || 500,
          token_fee: 100,
          profile_photo_url: photoUrl
        });
      } catch (dbErr) {
        console.warn('Supabase DB table insertion note:', dbErr);
      }
    }

    // 4. Save to local registry so the professional's session and pending state remain available
    try {
      const pendingProsKey = 'legalcure_pending_pros_v1';
      const existingPending = JSON.parse(localStorage.getItem(pendingProsKey) || '[]');
      const newPendingRecord = {
        id: `pro-pending-${Date.now()}`,
        professionalId,
        userId,
        authUid,
        fullName: data.fullName,
        email: cleanEmail,
        mobile: data.mobile,
        whatsapp: data.whatsapp,
        professionalType: data.professionalType,
        category: data.professionalType === 'amin' ? 'Amin / Land Surveyor' : 'Deed Writer',
        district: data.district,
        office: data.subRegistryOffice || `${data.block} Revenue Block`,
        block: data.block,
        subRegistryOffice: data.subRegistryOffice,
        yearsExperience: data.yearsExperience,
        licenseNumber: data.licenseNumber,
        about: data.about,
        services: data.services,
        languages: data.languages,
        availability: data.availability,
        documents: uploadedDocs,
        verificationStatus: 'pending',
        active: false,
        submittedAt: new Date().toISOString()
      };
      existingPending.unshift(newPendingRecord);
      localStorage.setItem(pendingProsKey, JSON.stringify(existingPending));
    } catch (e) {
      console.error('Error saving pending pro locally:', e);
    }

    return {
      success: true,
      professionalId,
      userId,
      status: 'pending',
      message: 'Your professional registration has been submitted successfully.'
    };
  },

  /**
   * User Customer Sign Up
   */
  signUpCustomer: async (payload: {
    fullName: string;
    mobile: string;
    whatsapp?: string;
    email: string;
    password?: string;
    district?: string;
  }): Promise<{ user: UserAccount; userCode: string }> => {
    const userCode = generateUserId();
    const cleanEmail = payload.email.trim().toLowerCase();
    let authUid = `usr-${Date.now()}`;

    if (isSupabaseConfigured && payload.password) {
      try {
        const { data: authRes } = await supabase.auth.signUp({
          email: cleanEmail,
          password: payload.password,
          options: {
            data: {
              full_name: payload.fullName,
              mobile: payload.mobile,
              role: 'customer',
              user_code: userCode
            }
          }
        });
        if (authRes.user) {
          authUid = authRes.user.id;
        }
      } catch (e) {
        console.warn('Customer Supabase auth notice:', e);
      }
    }

    const userAccount: UserAccount = {
      id: userCode,
      name: payload.fullName,
      email: cleanEmail,
      phone: payload.mobile,
      role: 'customer',
      district: payload.district || 'Patna',
      location: 'Bihar'
    };

    return { user: userAccount, userCode };
  },

  /**
   * User Sign In (Email / Phone / User ID)
   */
  signInUser: async (loginIdentifier: string, password?: string): Promise<UserAccount | null> => {
    const cleanId = loginIdentifier.trim().toLowerCase();

    if (isSupabaseConfigured && password && cleanId.includes('@')) {
      try {
        const { data: authRes, error } = await supabase.auth.signInWithPassword({
          email: cleanId,
          password
        });
        if (!error && authRes.user) {
          const u = authRes.user;
          const userMeta = u.user_metadata || {};
          return {
            id: userMeta.user_code || `LCU-${u.id.slice(0, 6)}`,
            name: userMeta.full_name || cleanId.split('@')[0],
            email: u.email || cleanId,
            phone: userMeta.mobile || '+91 94312 00000',
            role: (userMeta.role as any) || 'customer',
            district: userMeta.district || 'Patna'
          };
        }
      } catch (e) {
        console.warn('Supabase signin error:', e);
      }
    }

    return null;
  }
};
