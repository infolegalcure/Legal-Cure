import { Professional, Booking, Review, StampDutyCalcResult, ContactUnlock, WhatsAppMessage, Lead, VerificationStatus, BookingStatus } from '../types';
import { mockProfessionals, initialBookings, mockContactUnlocks, mockLeads, mockWhatsAppMessages, mockUsers } from './mockData';

const STORAGE_KEY_PROS = 'legalcure_pros_v2';
const STORAGE_KEY_BOOKINGS = 'legalcure_bookings_v2';
const STORAGE_KEY_UNLOCKS = 'legalcure_unlocks_v2';
const STORAGE_KEY_WA_MSGS = 'legalcure_wa_msgs_v2';
const STORAGE_KEY_LEADS = 'legalcure_leads_v2';

function getStoredPros(): Professional[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading stored pros:', e);
  }
  return mockProfessionals;
}

function getStoredBookings(): Booking[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading stored bookings:', e);
  }
  return initialBookings;
}

function getStoredUnlocks(): ContactUnlock[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_UNLOCKS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading stored unlocks:', e);
  }
  return mockContactUnlocks;
}

function getStoredWhatsAppMessages(): WhatsAppMessage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WA_MSGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading stored WA msgs:', e);
  }
  return mockWhatsAppMessages;
}

function getStoredLeads(): Lead[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEADS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading stored leads:', e);
  }
  return mockLeads;
}

function saveBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving bookings:', e);
  }
}

function savePros(pros: Professional[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PROS, JSON.stringify(pros));
  } catch (e) {
    console.error('Error saving pros:', e);
  }
}

function saveUnlocks(unlocks: ContactUnlock[]) {
  try {
    localStorage.setItem(STORAGE_KEY_UNLOCKS, JSON.stringify(unlocks));
  } catch (e) {
    console.error('Error saving unlocks:', e);
  }
}

function saveWhatsAppMessages(msgs: WhatsAppMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY_WA_MSGS, JSON.stringify(msgs));
  } catch (e) {
    console.error('Error saving WA msgs:', e);
  }
}

export interface ProfessionalFilters {
  category?: string;
  district?: string;
  location?: string;
  officeType?: string;
  minExperience?: number;
  maxFee?: number;
  verifiedOnly?: boolean;
  searchQuery?: string;
  sortBy?: 'rating' | 'experience' | 'price_asc' | 'cases';
}

export const professionalService = {
  getProfessionals: async (filters?: ProfessionalFilters): Promise<Professional[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    let list = [...getStoredPros()];

    // Phase 1 filter: Only active categories
    list = list.filter(p => p.isPhase1Active);

    if (!filters) return list;

    if (filters.category && filters.category !== 'All' && filters.category !== 'सभी श्रेणियां') {
      const catNorm = filters.category.toLowerCase().replace('/', ' ').trim();
      list = list.filter(p => {
        const pCatNorm = p.category.toLowerCase().replace('/', ' ').trim();
        return pCatNorm.includes(catNorm) || catNorm.includes(pCatNorm);
      });
    }

    if (filters.district && filters.district !== 'All' && filters.district !== 'सभी जिले') {
      list = list.filter(p => p.district.toLowerCase() === filters.district!.toLowerCase());
    }

    if (filters.location && filters.location !== 'All' && filters.location.trim() !== '') {
      const locNorm = filters.location.toLowerCase();
      list = list.filter(p => 
        (p.office && p.office.toLowerCase().includes(locNorm)) ||
        (p.block && p.block.toLowerCase().includes(locNorm)) ||
        (p.chamberAddress && p.chamberAddress.toLowerCase().includes(locNorm)) ||
        (p.district && locNorm.includes(p.district.toLowerCase()))
      );
    }

    if (filters.officeType && filters.officeType !== 'All') {
      list = list.filter(p => p.officeType === filters.officeType);
    }

    if (filters.minExperience) {
      list = list.filter(p => p.experience >= filters.minExperience!);
    }

    if (filters.maxFee) {
      list = list.filter(p => p.fee <= filters.maxFee!);
    }

    if (filters.verifiedOnly) {
      list = list.filter(p => p.verified || p.verificationStatus === 'Verified');
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
        p.district.toLowerCase().includes(q) ||
        p.office.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.services.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating':
          list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
          break;
        case 'experience':
          list.sort((a, b) => b.experience - a.experience);
          break;
        case 'price_asc':
          list.sort((a, b) => a.fee - b.fee);
          break;
        case 'cases':
          list.sort((a, b) => b.totalCasesCompleted - a.totalCasesCompleted);
          break;
      }
    }

    return list;
  },

  getProfessionalById: async (id: string): Promise<Professional | null> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const pros = getStoredPros();
    return pros.find(p => p.id === id) || null;
  },

  // Request Booking Flow
  createBooking: async (bookingData: {
    userId: string;
    clientName: string;
    clientPhone: string;
    clientWhatsapp?: string;
    clientEmail?: string;
    professionalId: string;
    professionalName: string;
    professionalCategory: string;
    professionalPhone: string;
    professionalOffice: string;
    district: string;
    location: string;
    serviceSelected: string;
    appointmentDate: string;
    appointmentTime: string;
    plotDetails?: {
      khataNumber?: string;
      khesraNumber?: string;
      mauza?: string;
      thanaNumber?: string;
      areaSize?: string;
    };
    requirementNote?: string;
    professionalFee: number;
    paymentMethod?: 'UPI' | 'Card' | 'NetBanking';
  }): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const bookings = getStoredBookings();
    const tokenFee = 100;
    const tokenPaid = 100;
    const remainingAtOffice = Math.max(0, bookingData.professionalFee - tokenPaid);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `LC-BHR-${new Date().getFullYear()}-${randomCode}`;
    const newId = `b-${Date.now()}`;

    const newBooking: Booking = {
      id: newId,
      bookingNumber,
      userId: bookingData.userId || 'LCU-001248',
      clientName: bookingData.clientName,
      clientPhone: bookingData.clientPhone,
      clientWhatsapp: bookingData.clientWhatsapp || bookingData.clientPhone,
      clientEmail: bookingData.clientEmail,
      professionalId: bookingData.professionalId,
      professionalName: bookingData.professionalName,
      professionalCategory: bookingData.professionalCategory,
      professionalPhone: bookingData.professionalPhone,
      professionalOffice: bookingData.professionalOffice,
      district: bookingData.district,
      location: bookingData.location,
      serviceSelected: bookingData.serviceSelected,
      appointmentDate: bookingData.appointmentDate,
      appointmentTime: bookingData.appointmentTime,
      plotDetails: bookingData.plotDetails,
      requirementNote: bookingData.requirementNote,
      professionalFee: bookingData.professionalFee,
      tokenFee,
      tokenPaid,
      remainingAtOffice,
      status: 'PENDING_PROFESSIONAL',
      paymentStatus: 'PAID', // Token payment is authorized
      paymentMethod: bookingData.paymentMethod || 'UPI',
      transactionId: `UPI/LCU/${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      isDemoData: true
    };

    bookings.unshift(newBooking);
    saveBookings(bookings);

    // Dispatch simulated WhatsApp alert to Professional
    const waMsgs = getStoredWhatsAppMessages();
    const newWaMsg: WhatsAppMessage = {
      id: `wa-${Date.now()}`,
      toPhone: newBooking.professionalPhone,
      recipientName: newBooking.professionalName,
      recipientRole: 'professional',
      templateName: 'booking_request_pro_alert',
      title: '🟢 NEW LEGALCURE BOOKING REQUEST',
      body: `*NEW LEGALCURE BOOKING REQUEST*\n\n*Client:* ${newBooking.clientName}\n*Service:* ${newBooking.serviceSelected}\n*District:* ${newBooking.district}\n*Location:* ${newBooking.location}\n*Date:* ${newBooking.appointmentDate} | *Time:* ${newBooking.appointmentTime}\n*Plot:* Khata ${newBooking.plotDetails?.khataNumber || 'N/A'}, Khesra ${newBooking.plotDetails?.khesraNumber || 'N/A'}\n*Token Paid:* ₹100\n\nPlease Accept, Reject, or Propose another time in your LegalCure dashboard.`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      actions: [
        { label: '✅ Accept Booking', actionKey: 'accept', type: 'primary' },
        { label: '⏰ Suggest Time', actionKey: 'suggest_time', type: 'secondary' },
        { label: '❌ Reject', actionKey: 'reject', type: 'danger' }
      ]
    };
    waMsgs.unshift(newWaMsg);
    saveWhatsAppMessages(waMsgs);

    return newBooking;
  },

  getBookings: async (userId?: string, proId?: string): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const all = getStoredBookings();
    if (proId) return all.filter(b => b.professionalId === proId);
    if (userId) return all.filter(b => b.userId === userId);
    return all;
  },

  // Professional accepts booking
  acceptBooking: async (bookingId: string): Promise<Booking | null> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const bookings = getStoredBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return null;

    b.status = 'CONFIRMED';
    b.updatedAt = new Date().toISOString();
    saveBookings(bookings);

    // Trigger WhatsApp to customer
    const waMsgs = getStoredWhatsAppMessages();
    waMsgs.unshift({
      id: `wa-${Date.now()}`,
      toPhone: b.clientPhone,
      recipientName: b.clientName,
      recipientRole: 'customer',
      templateName: 'booking_confirmed_user',
      title: '✅ BOOKING CONFIRMED - LEGALCURE',
      body: `*BOOKING CONFIRMED - LEGALCURE*\n\n*Booking ID:* ${b.bookingNumber}\n*Professional:* ${b.professionalName} (${b.professionalCategory})\n*Date:* ${b.appointmentDate} at ${b.appointmentTime}\n*Office:* ${b.professionalOffice}\n\nRemaining ₹${b.remainingAtOffice} to be settled at the office/site after service.`,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    });
    saveWhatsAppMessages(waMsgs);

    return b;
  },

  // Professional rejects booking
  rejectBooking: async (bookingId: string, reason?: string): Promise<Booking | null> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const bookings = getStoredBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return null;

    b.status = 'REJECTED';
    b.updatedAt = new Date().toISOString();
    saveBookings(bookings);

    // Trigger WhatsApp refund/rejection alert to customer
    const waMsgs = getStoredWhatsAppMessages();
    waMsgs.unshift({
      id: `wa-${Date.now()}`,
      toPhone: b.clientPhone,
      recipientName: b.clientName,
      recipientRole: 'customer',
      templateName: 'booking_rejected_user',
      title: '⚠️ BOOKING UPDATE - LEGALCURE',
      body: `*BOOKING UPDATE - LEGALCURE*\n\n*Booking ID:* ${b.bookingNumber}\nThe professional is unavailable for the requested slot: ${reason || 'Schedule occupied'}.\n\nYour ₹100 token fee has been credited back to your LegalCure wallet. You can book another verified professional immediately.`,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    });
    saveWhatsAppMessages(waMsgs);

    return b;
  },

  // Professional suggests alternative time
  suggestAlternativeTime: async (bookingId: string, newDate: string, newTime: string, note?: string): Promise<Booking | null> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const bookings = getStoredBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return null;

    b.status = 'TIME_CHANGE_REQUESTED';
    b.proposedAlternativeDate = newDate;
    b.proposedAlternativeTime = newTime;
    b.proposedAlternativeNote = note;
    b.updatedAt = new Date().toISOString();
    saveBookings(bookings);

    // Trigger WhatsApp to customer
    const waMsgs = getStoredWhatsAppMessages();
    waMsgs.unshift({
      id: `wa-${Date.now()}`,
      toPhone: b.clientPhone,
      recipientName: b.clientName,
      recipientRole: 'customer',
      templateName: 'booking_time_change_proposal',
      title: '⏰ ALTERNATIVE TIME PROPOSED - LEGALCURE',
      body: `*ALTERNATIVE TIME PROPOSED - LEGALCURE*\n\n*Booking ID:* ${b.bookingNumber}\n*Professional:* ${b.professionalName}\n*Proposed Slot:* ${newDate} at ${newTime}\n*Note:* ${note || 'Slot adjustment requested'}\n\nPlease open your LegalCure dashboard or reply YES to confirm the new slot.`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      actions: [
        { label: '✅ Accept New Slot', actionKey: 'accept_new_slot', type: 'primary' },
        { label: '❌ Cancel Booking', actionKey: 'cancel_booking', type: 'danger' }
      ]
    });
    saveWhatsAppMessages(waMsgs);

    return b;
  },

  // User accepts proposed alternative time
  acceptAlternativeTime: async (bookingId: string): Promise<Booking | null> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const bookings = getStoredBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return null;

    if (b.proposedAlternativeDate && b.proposedAlternativeTime) {
      b.appointmentDate = b.proposedAlternativeDate;
      b.appointmentTime = b.proposedAlternativeTime;
    }
    b.status = 'CONFIRMED';
    b.updatedAt = new Date().toISOString();
    saveBookings(bookings);

    return b;
  },

  // Contact Unlock Flow (₹100)
  unlockContact: async (userId: string, professional: Professional): Promise<ContactUnlock> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const unlocks = getStoredUnlocks();
    const newUnlock: ContactUnlock = {
      id: `cu-${Date.now()}`,
      userId: userId || 'LCU-001248',
      professionalId: professional.id,
      professionalName: professional.name,
      professionalCategory: professional.category,
      amount: 100,
      paymentStatus: 'PAID',
      unlockedPhone: professional.phone,
      unlockedWhatsapp: professional.whatsapp || professional.phone,
      chamberAddress: professional.chamberAddress,
      unlockedAt: new Date().toISOString(),
      transactionId: `UPI/LCU/${Date.now().toString().slice(-8)}`
    };

    unlocks.unshift(newUnlock);
    saveUnlocks(unlocks);
    return newUnlock;
  },

  getContactUnlocks: async (userId?: string): Promise<ContactUnlock[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const unlocks = getStoredUnlocks();
    if (userId) return unlocks.filter(u => u.userId === userId);
    return unlocks;
  },

  getWhatsAppMessages: async (): Promise<WhatsAppMessage[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getStoredWhatsAppMessages();
  },

  getLeads: async (): Promise<Lead[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getStoredLeads();
  },

  // Admin Verification
  updateVerificationStatus: async (proId: string, status: VerificationStatus): Promise<Professional | null> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const pros = getStoredPros();
    const p = pros.find(item => item.id === proId);
    if (!p) return null;

    p.verificationStatus = status;
    p.verified = (status === 'Verified');
    savePros(pros);
    return p;
  },

  registerProfessional: async (formData: {
    name: string;
    category: 'Deed Writer' | 'Amin / Land Surveyor';
    mobile: string;
    whatsapp: string;
    email: string;
    district: string;
    location: string;
    licenseNumber: string;
    licenseAuthority: string;
    experience: number;
    fee: number;
    chamberAddress: string;
    services: string[];
    about: string;
  }): Promise<Professional> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const pros = getStoredPros();
    const randomId = `LCP-000${Math.floor(100 + Math.random() * 900)}`;

    const newPro: Professional = {
      id: randomId,
      name: formData.name,
      category: formData.category,
      isPhase1Active: true,
      rating: 5.0,
      reviewCount: 0,
      experience: Number(formData.experience) || 5,
      district: formData.district,
      office: formData.location,
      officeType: formData.category === 'Deed Writer' ? 'Registry Office' : 'Block Office',
      chamberAddress: formData.chamberAddress,
      verificationStatus: 'Under Review',
      verified: false,
      licenseNumber: formData.licenseNumber || 'PENDING-VERIFICATION',
      licenseAuthority: formData.licenseAuthority || 'Bihar Revenue / Registration Dept',
      fee: Number(formData.fee) || 2000,
      tokenFee: 100,
      services: formData.services.length > 0 ? formData.services : [formData.category === 'Deed Writer' ? 'Sale Deed (Kewala)' : 'Land Measurement'],
      languages: ['Hindi', 'English'],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      about: formData.about || 'Newly registered professional awaiting credential validation by LegalCure compliance team.',
      phone: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
      reviews: [],
      totalCasesCompleted: 0,
      isDemoData: true
    };

    pros.unshift(newPro);
    savePros(pros);
    return newPro;
  },

  addReview: async (proId: string, review: Omit<Review, 'id' | 'date' | 'verifiedBooking'>): Promise<Professional | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const pros = getStoredPros();
    const pro = pros.find(p => p.id === proId);
    if (!pro) return null;

    const newRev: Review = {
      ...review,
      id: `r-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      verifiedBooking: true,
      isDemoData: true
    };

    pro.reviews.unshift(newRev);
    const totalRating = pro.reviews.reduce((acc, r) => acc + r.rating, 0);
    pro.rating = Number((totalRating / pro.reviews.length).toFixed(1));
    pro.reviewCount = pro.reviews.length;

    savePros(pros);
    return pro;
  },

  calculateBiharStampDuty: (
    propertyValue: number,
    gender: 'male' | 'female' | 'joint',
    locationType: 'urban' | 'rural',
    transactionType: 'sale' | 'gift' | 'lease' | 'partition'
  ): StampDutyCalcResult => {
    let stampPercent = 6.0;
    let regPercent = 2.0;

    if (transactionType === 'gift') {
      stampPercent = 1.0;
      regPercent = 1.0;
    } else if (transactionType === 'partition') {
      stampPercent = 2.0;
      regPercent = 1.0;
    } else {
      if (gender === 'female') {
        stampPercent = 5.7;
        regPercent = 1.9;
      } else if (gender === 'joint') {
        stampPercent = 5.85;
        regPercent = 1.95;
      } else {
        stampPercent = 6.0;
        regPercent = 2.0;
      }
    }

    const stampDutyAmount = Math.round((propertyValue * stampPercent) / 100);
    const registrationFeeAmount = Math.round((propertyValue * regPercent) / 100);
    const processingFee = 500;

    return {
      propertyValue,
      gender,
      locationType,
      transactionType,
      stampDutyPercent: stampPercent,
      stampDutyAmount,
      registrationFeePercent: regPercent,
      registrationFeeAmount,
      processingFee,
      totalGovtFees: stampDutyAmount + registrationFeeAmount + processingFee
    };
  }
};
