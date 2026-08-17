export type Language = 'en' | 'hi';

export type ProfessionalCategory = 
  | 'Deed Writer' 
  | 'Lawyer' 
  | 'Amin / Land Surveyor' 
  | 'Notary' 
  | 'Document Checker';

export type OfficeType = 'Registry Office' | 'Block Office' | 'Civil Court' | 'Independent Chamber';

export type UserRole = 'customer' | 'professional' | 'admin';

export type BookingStatus = 
  | 'BOOKING_REQUESTED'
  | 'PENDING_PROFESSIONAL'
  | 'TIME_CHANGE_REQUESTED'
  | 'CONFIRMED'
  | 'Confirmed'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'Completed'
  | 'REJECTED'
  | 'CANCELLED'
  | 'Cancelled'
  | 'Rescheduled';

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
  suggestedDate?: string;
  suggestedTime?: string;
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
  status: BookingStatus;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  transactionId: string;
  createdAt: string;
  notes?: string;
}

export interface ContactUnlock {
  id: string;
  userId: string;
  professionalId: string;
  professionalName: string;
  professionalPhone: string;
  officeAddress: string;
  unlockedAt: string;
  tokenPaid: number;
}

export interface Lead {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceType: string;
  district: string;
  createdAt: string;
  message?: string;
}

export interface WhatsAppMessage {
  id: string;
  templateKey: string;
  recipientPhone: string;
  recipientRole: string;
  messageBody: string;
  sentAt: string;
  bookingNumber?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  district?: string;
  location?: string;
  licenseNumber?: string;
}

export interface DistrictInfo {
  name: string;
  nameHi: string;
  division: string;
  registryOffices: string[];
  blocks: string[];
  courts: string[];
  notaryZones: string[];
}

export interface SearchQueryObject {
  professionalType: string;
  district: string;
  location: string;
  timestamp?: number;
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
