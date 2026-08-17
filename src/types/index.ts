export type Language = 'en' | 'hi';

export type ProfessionalCategory = 
  | 'Deed Writer' 
  | 'Lawyer' 
  | 'Amin / Land Surveyor' 
  | 'Notary' 
  | 'Document Checker';

export type OfficeType = 'Registry Office' | 'Block Office' | 'Civil Court' | 'Independent Chamber';

export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking: boolean;
}

export interface Professional {
  id: string;
  name: string;
  nameHi?: string;
  category: ProfessionalCategory;
  categoryHi?: string;
  rating: number;
  reviewCount: number;
  experience: number;
  district: string;
  districtHi?: string;
  block?: string;
  office: string;
  officeHi?: string;
  officeType: OfficeType;
  chamberAddress: string;
  verified: boolean;
  licenseNumber: string;
  licenseAuthority: string;
  fee: number;
  tokenFee: number;
  services: string[];
  servicesHi?: string[];
  languages: string[];
  image: string;
  about: string;
  aboutHi?: string;
  phone: string;
  whatsapp?: string;
  availableDays: string[];
  timeSlots: string[];
  reviews: Review[];
  totalCasesCompleted: number;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  professionalId: string;
  professionalName: string;
  professionalCategory: string;
  professionalPhone: string;
  professionalOffice: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  district: string;
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
  professionalFee: number;
  tokenPaid: number;
  remainingAtOffice: number;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  transactionId: string;
  createdAt: string;
  notes?: string;
}

export interface DistrictInfo {
  name: string;
  nameHi: string;
  division: string;
  registryOffices: string[];
  blocks: string[];
}

export interface StampDutyCalcResult {
  propertyValue: number;
  gender: 'male' | 'female' | 'joint';
  locationType: 'urban' | 'rural';
  transactionType: 'sale' | 'gift' | 'lease' | 'partition';
  stampDutyPercent: number;
  stampDutyAmount: number;
  registrationFeePercent: number;
  registrationFeeAmount: number;
  processingFee: number;
  totalGovtFees: number;
}
