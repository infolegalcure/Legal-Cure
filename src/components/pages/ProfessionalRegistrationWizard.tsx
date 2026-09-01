import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  User, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  X, 
  Clock, 
  Languages, 
  Calendar,
  Lock,
  Phone,
  Mail,
  Building2,
  Sparkles,
  Camera,
  FileCheck
} from 'lucide-react';
import { BIHAR_DISTRICTS } from '../../constants/biharData';
import { supabaseDataService, ProRegistrationPayload } from '../../services/supabaseDataService';

const DEED_WRITER_SERVICES = [
  'Sale Deed (Kewala / बिक्री केवाला)',
  'Gift Deed (Hibanama / दान पत्र)',
  'Partition Deed (Batwarinama / पारिवारिक बंटवारानामा)',
  'Will Drafting (वसीयतनामा)',
  'General Power of Attorney (मुख्तारनामा)',
  'Mortgage & Agreement (बंधक व इकरारनामा)',
  'Land Search & Token Filing (जमीन सर्च व टोकन दाखिला)',
  'Correction & Rectification Deed (ततीमा व सुधारनामा)'
];

const AMIN_SERVICES = [
  'Land Boundary Demarcation (हदबंदी व पिलर स्थापन)',
  'Katha / Dhur / Decimal Area Measurement (कट्ठा-धूर-डिसमिल पैमाइश)',
  'Cadastral & CS/RS/Revisional Map Matching (कैडस्ट्रल / खतियानी नक्शा मिलान)',
  'Electronic Total Station (ETS) Digital Survey (ईटीएस डिजिटल सर्वे)',
  'Land Partition & Share Division (हिस्सा नापी व पारिवारिक तकसीम)',
  'Road & Right of Way Demarcation (रास्ता / चकरोड सीमांकन)',
  'Pre-Purchase Plot Verification (प्लॉट क्रय पूर्व सत्यापन)',
  'GPS / Satellite Coordinate Survey (जीपीएस कोऑर्डिनेट सर्वे)'
];

const AVAILABLE_LANGUAGES = [
  'Hindi (हिन्दी)',
  'Bhojpuri (भोजपुरी)',
  'Maithili (मैथिली)',
  'Magahi (मगही)',
  'Angika (अंगिका)',
  'English',
  'Urdu (उर्दू)'
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const ProfessionalRegistrationWizard: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { lang, showToast, setActiveView, setCurrentUser } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    professionalId: string;
    userId: string;
    status: string;
  } | null>(null);

  // Form State
  // Step 1: Account
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Professional Type & Experience
  const [professionalType, setProfessionalType] = useState<'amin' | 'deed_writer'>('deed_writer');
  const [yearsExperience, setYearsExperience] = useState<number>(5);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseAuthority, setLicenseAuthority] = useState('');
  const [about, setAbout] = useState('');
  const [consultationFee, setConsultationFee] = useState<number>(500);

  // Step 3: Location
  const [district, setDistrict] = useState<string>('Patna');
  const [subRegistryOffice, setSubRegistryOffice] = useState<string>('');
  const [block, setBlock] = useState<string>('');
  const [chamberAddress, setChamberAddress] = useState<string>('');

  // Step 4: Services & Availability
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Hindi (हिन्दी)', 'Bhojpuri (भोजपुरी)']);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [startTime, setStartTime] = useState<string>('09:30');
  const [endTime, setEndTime] = useState<string>('17:30');

  // Step 5: Documents
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null);
  const [supportingDoc, setSupportingDoc] = useState<File | null>(null);

  // Step 6: Review & Terms
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  // Districts sorted A -> Z
  const sortedDistricts = useMemo(() => {
    return [...BIHAR_DISTRICTS].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  }, []);

  // Selected District Object
  const currentDistrictObj = useMemo(() => {
    return BIHAR_DISTRICTS.find(d => d.name === district) || BIHAR_DISTRICTS[0];
  }, [district]);

  // SROs for current district sorted A -> Z
  const sortedSros = useMemo(() => {
    if (!currentDistrictObj || !currentDistrictObj.registryOffices) return [];
    return [...currentDistrictObj.registryOffices].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  }, [currentDistrictObj]);

  // Blocks for current district sorted A -> Z
  const sortedBlocks = useMemo(() => {
    if (!currentDistrictObj || !currentDistrictObj.blocks) return [];
    return [...currentDistrictObj.blocks].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  }, [currentDistrictObj]);

  // Reset SRO/Block when district changes
  React.useEffect(() => {
    if (sortedSros.length > 0 && !sortedSros.includes(subRegistryOffice)) {
      setSubRegistryOffice(sortedSros[0]);
    }
    if (sortedBlocks.length > 0 && !sortedBlocks.includes(block)) {
      setBlock(sortedBlocks[0]);
    }
  }, [district, sortedSros, sortedBlocks]);

  // Available services based on type
  const availableServices = professionalType === 'amin' ? AMIN_SERVICES : DEED_WRITER_SERVICES;

  // Toggle service selection
  const toggleService = (srv: string) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  // Toggle language selection
  const toggleLanguage = (langName: string) => {
    setSelectedLanguages(prev => 
      prev.includes(langName) ? prev.filter(l => l !== langName) : [...prev, langName]
    );
  };

  // Toggle day selection
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Profile photo handler
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation per step
  const validateStep = (stepNumber: number): boolean => {
    setErrorMessage(null);

    if (stepNumber === 1) {
      if (!fullName.trim()) {
        setErrorMessage(lang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
        return false;
      }
      if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
        setErrorMessage(lang === 'hi' ? 'कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage(lang === 'hi' ? 'कृपया मान्य ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
        return false;
      }
      if (!password || password.length < 6) {
        setErrorMessage(lang === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
        return false;
      }
      if (password !== confirmPassword) {
        setErrorMessage(lang === 'hi' ? 'पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।' : 'Password and Confirm Password do not match.');
        return false;
      }
      return true;
    }

    if (stepNumber === 2) {
      if (yearsExperience < 0) {
        setErrorMessage('Years of experience must be 0 or higher.');
        return false;
      }
      return true;
    }

    if (stepNumber === 3) {
      if (!district) {
        setErrorMessage('Please select a district.');
        return false;
      }
      if (professionalType === 'deed_writer' && !subRegistryOffice) {
        setErrorMessage('Please select your Sub-Registry Office.');
        return false;
      }
      if (professionalType === 'amin' && !block) {
        setErrorMessage('Please select your Revenue Block.');
        return false;
      }
      return true;
    }

    if (stepNumber === 4) {
      if (selectedServices.length === 0) {
        setErrorMessage(lang === 'hi' ? 'कृपया कम से कम एक सेवा का चयन करें।' : 'Please select at least one service offered.');
        return false;
      }
      if (selectedLanguages.length === 0) {
        setErrorMessage(lang === 'hi' ? 'कृपया कम से कम एक भाषा चुनें।' : 'Please select at least one spoken language.');
        return false;
      }
      if (selectedDays.length === 0) {
        setErrorMessage(lang === 'hi' ? 'कृपया कम से कम एक कार्य दिवस चुनें।' : 'Please select at least one working day.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      setErrorMessage(lang === 'hi' ? 'कृपया नियम एवं शर्तों को स्वीकार करें।' : 'Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const payload: ProRegistrationPayload = {
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      whatsapp: whatsapp.trim() || mobile.trim(),
      email: email.trim().toLowerCase(),
      password,
      professionalType,
      yearsExperience,
      licenseNumber: licenseNumber.trim(),
      licenseAuthority: licenseAuthority.trim() || (professionalType === 'amin' ? 'Bihar Revenue Dept' : 'Registration Dept Bihar'),
      chamberAddress: chamberAddress.trim() || (professionalType === 'deed_writer' ? subRegistryOffice : block),
      about: about.trim(),
      consultationFee,
      district,
      subRegistryOffice: professionalType === 'deed_writer' ? subRegistryOffice : undefined,
      block: professionalType === 'amin' ? block : undefined,
      services: selectedServices,
      languages: selectedLanguages,
      availability: selectedDays.map(day => ({
        day,
        startTime,
        endTime
      })),
      profilePhoto,
      identityDoc,
      licenseDoc,
      supportingDoc
    };

    try {
      const result = await supabaseDataService.registerProfessional(payload);
      if (result.success) {
        setSubmissionResult({
          professionalId: result.professionalId,
          userId: result.userId,
          status: 'pending'
        });
        showToast(
          lang === 'hi' 
            ? `पंजीकरण सफल! आपका प्रोफेशनल आईडी: ${result.professionalId}` 
            : `Registration submitted! Assigned ID: ${result.professionalId}`,
          'success'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submissionResult) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-6 animate-in fade-in-50">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full uppercase tracking-wider">
              Status: PENDING VERIFICATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63]">
              {lang === 'hi' ? 'आपका पंजीकरण सफलतापूर्वक जमा हो गया है' : 'Your Professional Registration Has Been Submitted'}
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              {lang === 'hi' 
                ? 'बिहार निबंधन एवं राजस्व अनुपालन दल द्वारा आपके दस्तावेजों का सत्यापन 24-48 घंटों के भीतर किया जाएगा।'
                : 'Our Bihar verification officers will verify your license and office credentials within 24–48 hours.'}
            </p>
          </div>

          {/* Registration Details Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Assigned Professional ID:</span>
              <span className="font-extrabold text-[#082B63] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {submissionResult.professionalId}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Full Name:</span>
              <span className="font-bold text-slate-800">{fullName}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Category:</span>
              <span className="font-bold text-slate-800">
                {professionalType === 'amin' ? 'Amin / Land Surveyor' : 'Deed Writer (Katib)'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Location:</span>
              <span className="font-bold text-slate-800">
                {district} ({professionalType === 'deed_writer' ? subRegistryOffice : block})
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 font-semibold">Registered Email / Mobile:</span>
              <span className="font-bold text-slate-800">{email} / {mobile}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#082B63] hover:bg-[#0B3D91] text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md"
            >
              {lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Return to Home'}
            </button>
            <button
              onClick={() => {
                setActiveView('pro_dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-slate-300 hover:border-[#082B63] text-slate-700 hover:text-[#082B63] px-6 py-2.5 rounded-full text-xs font-bold transition-all"
            >
              {lang === 'hi' ? 'प्रोफेशनल पोर्टल देखें' : 'View Pro Portal'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // WIZARD STEPS
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#082B63] border border-blue-200 px-3.5 py-1 rounded-full text-xs font-extrabold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'hi' ? 'सरकारी मान्यता प्राप्त प्रोफेशनल नेटवर्क' : 'Official Verified Professional Onboarding'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#082B63] tracking-tight">
          {lang === 'hi' ? 'सत्यापित विशेषज्ञ के रूप में लीगलक्योर से जुड़ें' : 'Join LegalCure as a Verified Professional'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi' 
            ? 'बिहार में जमीन और संपत्ति से जुड़ी सेवाओं की तलाश कर रहे ग्राहकों से सीधे जुड़ें।'
            : 'Connect with customers looking for land and property-related services in Bihar.'}
        </p>
      </div>

      {/* 6-Step Progress Indicator */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center">
          {[
            { step: 1, title: 'Account', icon: User },
            { step: 2, title: 'Details', icon: Briefcase },
            { step: 3, title: 'Location', icon: MapPin },
            { step: 4, title: 'Services', icon: FileText },
            { step: 5, title: 'Documents', icon: Upload },
            { step: 6, title: 'Review', icon: CheckCircle2 }
          ].map(s => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            const IconComponent = s.icon;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  if (s.step < currentStep) setCurrentStep(s.step);
                }}
                disabled={s.step > currentStep}
                className={`flex flex-col items-center gap-1.5 transition-all ${
                  isCurrent 
                    ? 'text-[#082B63]' 
                    : isCompleted 
                    ? 'text-emerald-600 cursor-pointer' 
                    : 'text-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <div 
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent 
                      ? 'bg-[#082B63] text-white ring-4 ring-blue-100 shadow-sm' 
                      : isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>
                <span className="text-[10px] sm:text-xs font-bold truncate max-w-full hidden sm:inline">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in-50">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        {/* STEP 1: ACCOUNT DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 1: Account & Contact Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Private contact information. Never shown publicly to clients without authorization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (पूरा नाम) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Sinha"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (मोबाइल) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number (वैकल्पिक)
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="For real-time booking alerts"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (ईमेल) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh.sinha@legalcure.in"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password (पासवर्ड) <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password (पासवर्ड की पुष्टि करें) <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 2: Professional Category & Practice</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Phase 1 exclusively activates Amin / Land Surveyor and Deed Writer categories.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Professional Type (A → Z) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Amin / Land Surveyor */}
                <button
                  type="button"
                  onClick={() => setProfessionalType('amin')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    professionalType === 'amin'
                      ? 'border-[#082B63] bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-[#082B63]">1. Amin / Land Surveyor</span>
                    {professionalType === 'amin' && <CheckCircle2 className="w-5 h-5 text-[#082B63]" />}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    अमीन / भूमि सर्वेयर — Plot measurement in Katha/Dhur/Decimal, boundary demarcation, ETS and Cadastral survey.
                  </p>
                </button>

                {/* 2. Deed Writer */}
                <button
                  type="button"
                  onClick={() => setProfessionalType('deed_writer')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    professionalType === 'deed_writer'
                      ? 'border-[#082B63] bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-[#082B63]">2. Deed Writer</span>
                    {professionalType === 'deed_writer' && <CheckCircle2 className="w-5 h-5 text-[#082B63]" />}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    दस्तावेज लेखक (कातिब) — Drafting Sale Deed (Kewala), Gift Deed, Batwarinama, and Sub-Registry token filings.
                  </p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Years of Experience (कार्य अनुभव वर्ष) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(Number(e.target.value))}
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Consultation Base Fee (परामर्श शुल्क ₹)
                </label>
                <input
                  type="number"
                  min="100"
                  step="50"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))}
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  License / Registration / Certificate Number
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g. BR-REG-PAT-2015-098"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Issuing Authority
                </label>
                <input
                  type="text"
                  value={licenseAuthority}
                  onChange={(e) => setLicenseAuthority(e.target.value)}
                  placeholder="e.g. Registration Department, Govt of Bihar"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  About Your Practice / Bio (संक्षिप्त परिचय)
                </label>
                <textarea
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Describe your expertise, specialization in registry office / revenue block, and experience..."
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION (STRICT CASCADING) */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 3: Operating Location in Bihar</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Deed Writers are linked strictly to Sub-Registry Offices. Amins are linked strictly to Revenue Blocks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select District (बिहार का जिला) <span className="text-red-500">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63] bg-white"
                >
                  {sortedDistricts.map(d => (
                    <option key={d.name} value={d.name}>
                      {d.name} ({d.nameHi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Location */}
              {professionalType === 'deed_writer' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Sub-Registry Office (निबंधन कार्यालय) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subRegistryOffice}
                    onChange={(e) => setSubRegistryOffice(e.target.value)}
                    className="w-full text-xs font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63] bg-white"
                  >
                    {sortedSros.map(sro => (
                      <option key={sro} value={sro}>
                        {sro}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Revenue Block (प्रखंड) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full text-xs font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63] bg-white"
                  >
                    {sortedBlocks.map(blk => (
                      <option key={blk} value={blk}>
                        {blk} Block
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chamber / Office / Registry Shed Details (कार्यालय या शेड का विवरण)
                </label>
                <input
                  type="text"
                  value={chamberAddress}
                  onChange={(e) => setChamberAddress(e.target.value)}
                  placeholder="e.g. Shed No. 14, Near Registration Counter, Patna Sadar"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SERVICES & AVAILABILITY */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 4: Services Offered & Working Schedule</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select the specific deeds or land survey services you provide.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Services Offered (सेवाएं चुनें) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableServices.map(srv => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                        isChecked 
                          ? 'border-[#082B63] bg-blue-50 text-[#082B63]' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate pr-2">{srv}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-[#082B63] border-[#082B63] text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Languages Spoken (भाषाएं) <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_LANGUAGES.map(l => {
                  const isSelected = selectedLanguages.includes(l);
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => toggleLanguage(l)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        isSelected 
                          ? 'bg-[#082B63] text-white border-[#082B63]' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Available Working Days (कार्य दिवस) <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {DAYS_OF_WEEK.map(day => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isSelected 
                          ? 'bg-emerald-700 text-white border-emerald-700' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: DOCUMENT UPLOAD */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 5: Professional Verification Documents</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All uploaded documents are stored in private encrypted storage and accessible solely to state verification officers.
              </p>
            </div>

            {/* Profile Photo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 shrink-0">
                {profilePhotoPreview ? (
                  <img src={profilePhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-300" />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Professional Profile Photo (प्रोफाइल फोटो)</h4>
                <p className="text-[11px] text-slate-500">JPG, PNG up to 5MB. Clear face photo helps clients recognize you at the office.</p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <label className="bg-white border border-slate-300 hover:border-[#082B63] text-[#082B63] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all">
                    <span>{profilePhoto ? 'Replace Photo' : 'Upload Photo'}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                  {profilePhoto && (
                    <button
                      type="button"
                      onClick={() => { setProfilePhoto(null); setProfilePhotoPreview(null); }}
                      className="text-red-600 text-xs font-bold hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* License / Registration Document */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    License / Amin Certificate Document (लाइसेंस या प्रमाण पत्र)
                  </h4>
                  <p className="text-[11px] text-slate-500">PDF, JPG, PNG (Max 10MB)</p>
                </div>
                {licenseDoc && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                    ✓ Attached
                  </span>
                )}
              </div>
              {licenseDoc ? (
                <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold truncate text-slate-700">{licenseDoc.name}</span>
                  <button
                    type="button"
                    onClick={() => setLicenseDoc(null)}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-slate-200 hover:border-[#082B63] p-4 rounded-xl text-center cursor-pointer transition-all bg-slate-50/50">
                  <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-[#082B63]">Click to Upload License Document</span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => e.target.files && setLicenseDoc(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Identity Document */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Government Identity Proof (Aadhaar / Voter ID / PAN)
                  </h4>
                  <p className="text-[11px] text-slate-500">Used strictly for background identity verification</p>
                </div>
                {identityDoc && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                    ✓ Attached
                  </span>
                )}
              </div>
              {identityDoc ? (
                <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold truncate text-slate-700">{identityDoc.name}</span>
                  <button
                    type="button"
                    onClick={() => setIdentityDoc(null)}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-slate-200 hover:border-[#082B63] p-4 rounded-xl text-center cursor-pointer transition-all bg-slate-50/50">
                  <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-[#082B63]">Click to Upload Identity Document</span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => e.target.files && setIdentityDoc(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
              <h2 className="text-lg font-extrabold text-[#082B63]">Step 6: Review & Final Submission</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review your profile details before submitting for official state verification.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 font-semibold block">Full Name:</span>
                  <span className="font-bold text-slate-900">{fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Mobile & WhatsApp:</span>
                  <span className="font-bold text-slate-900">{mobile} ({whatsapp || 'Same'})</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Email:</span>
                  <span className="font-bold text-slate-900">{email}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Category:</span>
                  <span className="font-bold text-[#082B63]">
                    {professionalType === 'amin' ? 'Amin / Land Surveyor' : 'Deed Writer'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">District & Office:</span>
                  <span className="font-bold text-slate-900">
                    {district} ({professionalType === 'deed_writer' ? subRegistryOffice : block})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Experience & Base Fee:</span>
                  <span className="font-bold text-slate-900">{yearsExperience} Years | ₹{consultationFee}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Services ({selectedServices.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedServices.map(s => (
                    <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Languages:</span>
                <span className="font-bold text-slate-800">{selectedLanguages.join(', ')}</span>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#082B63] focus:ring-[#082B63]"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  I hereby declare that all licensing information, certificates, and practice credentials provided above are accurate and genuine under Bihar Land Records & Registration compliance. I agree to LegalCure Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold text-xs transition-all shadow-md"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !termsAccepted}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs transition-all shadow-md ${
                submitting || !termsAccepted 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20'
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Supabase...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
