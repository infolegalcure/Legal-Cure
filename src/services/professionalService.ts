import { Professional, Booking, Review, StampDutyCalcResult } from '../types';
import { mockProfessionals, initialBookings } from './mockData';

const STORAGE_KEY_PROS = 'legalcure_pros_v1';
const STORAGE_KEY_BOOKINGS = 'legalcure_bookings_v1';

// Initialize localStorage if not present
function getStoredPros(): Professional[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading stored pros:', e);
  }
  return mockProfessionals;
}

function getStoredBookings(): Booking[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading stored bookings:', e);
  }
  return initialBookings;
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
    // Simulate API delay for backend-ready feel
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Always retrieve active professionals pool
    let list = [...getStoredPros()];

    // PHASE 1 STRICT ISOLATION: Public search ONLY supports Deed Writer and Amin / Land Surveyor
    list = list.filter(p => {
      const cat = p.category;
      return (cat === 'Deed Writer' || cat === 'Amin / Land Surveyor') && p.verified !== false;
    });

    if (!filters) return list;

    // 1. Professional Category Filter
    if (filters.category && filters.category !== 'All' && filters.category !== 'सभी श्रेणियां') {
      const catNorm = filters.category.toLowerCase().replace('/', ' ').trim();
      list = list.filter(p => {
        const pCatNorm = p.category.toLowerCase().replace('/', ' ').trim();
        if (catNorm.includes('amin') || catNorm.includes('surveyor') || catNorm.includes('अमीन')) {
          return pCatNorm.includes('amin') || pCatNorm.includes('surveyor');
        }
        if (catNorm.includes('deed') || catNorm.includes('कातिब') || catNorm.includes('katib')) {
          return pCatNorm.includes('deed') || pCatNorm.includes('लेखक') || pCatNorm.includes('katib');
        }
        return pCatNorm === catNorm;
      });
    }

    // 2. District Filter (Strict exact match, case-insensitive)
    if (filters.district && filters.district !== 'All' && filters.district !== 'सभी जिले') {
      const distNorm = filters.district.trim().toLowerCase();
      list = list.filter(p => p.district && p.district.trim().toLowerCase() === distNorm);
    }

    // 3. Conditional Location Filter (SRO for Deed Writer, Block for Amin)
    if (filters.location && filters.location !== 'All' && filters.location.trim() !== '') {
      const locNorm = filters.location.trim().toLowerCase();
      list = list.filter(p => {
        if (p.category === 'Deed Writer') {
          // Deed Writer must match office/SRO or exact name
          return (p.office && p.office.toLowerCase().includes(locNorm)) ||
                 (locNorm.includes(p.office?.toLowerCase() || '')) ||
                 (p.block && p.block.toLowerCase() === locNorm);
        } else if (p.category === 'Amin / Land Surveyor') {
          // Amin must match block or assigned office
          return (p.block && p.block.toLowerCase() === locNorm) ||
                 (p.block && locNorm.includes(p.block.toLowerCase())) ||
                 (p.office && p.office.toLowerCase().includes(locNorm));
        }
        return (p.office && p.office.toLowerCase().includes(locNorm)) ||
               (p.block && p.block.toLowerCase().includes(locNorm));
      });
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
      list = list.filter(p => p.verified);
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
        p.district.toLowerCase().includes(q) ||
        (p.office && p.office.toLowerCase().includes(q)) ||
        (p.block && p.block.toLowerCase().includes(q)) ||
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
    await new Promise(resolve => setTimeout(resolve, 200));
    const pros = getStoredPros();
    return pros.find(p => p.id === id) || null;
  },

  createBooking: async (bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'tokenPaid' | 'remainingAtOffice'>): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const bookings = getStoredBookings();
    const tokenPaid = 100; // Fixed LegalCure Token
    const remainingAtOffice = Math.max(0, bookingData.professionalFee - tokenPaid);
    
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
      bookingNumber: `LC-BHR-${new Date().getFullYear()}-${randomCode}`,
      tokenPaid,
      remainingAtOffice,
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    saveBookings(bookings);
    return newBooking;
  },

  getBookings: async (): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return getStoredBookings();
  },

  cancelBooking: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const bookings = getStoredBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
    saveBookings(updated);
    return true;
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
      verifiedBooking: true
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
    // Official Bihar Stamp Duty & Registration rules:
    // Male buyer: 6.0% Stamp Duty + 2.0% Registration Fee
    // Female buyer: 5.7% Stamp Duty + 1.9% Registration Fee (0.3% discount)
    // Joint buyer (Male + Female): 6.0% / 2.0% or 5.85%
    // Gift deed to blood relation: 1.0% Stamp Duty + 1.0% Reg Fee
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
    const processingFee = 500; // Service/online scanning fee

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
