import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Professional, Booking, SearchQueryObject, UserAccount, UserRole, ContactUnlock, WhatsAppMessage, Lead } from '../types';
import { translations } from '../constants/translations';
import { professionalService, ProfessionalFilters } from '../services/professionalService';
import { mockUsers } from '../services/mockData';

export type ActiveViewType = 
  | 'home' 
  | 'professionals' 
  | 'how_it_works' 
  | 'for_professionals'
  | 'knowledge_center'
  | 'stamp_duty'
  | 'bookings' 
  | 'pro_dashboard' 
  | 'admin';

export type AuthModalMode = 'login' | 'signup' | 'pro-signup' | 'forgot-password';

export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations.en) => string;
  
  activeView: ActiveViewType;
  setActiveView: (view: ActiveViewType) => void;
  
  // Auth & Roles
  currentUser: UserAccount | null;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginUser: (account: Partial<UserAccount>) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  
  // Search & Filters
  filters: ProfessionalFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProfessionalFilters>>;
  updateFilter: (key: keyof ProfessionalFilters, value: any) => void;
  resetFilters: () => void;
  activeSearchQuery: SearchQueryObject | null;
  setActiveSearchQuery: (query: SearchQueryObject | null) => void;
  executeSearchQuery: (query: SearchQueryObject) => void;
  
  // Data
  professionals: Professional[];
  loadingPros: boolean;
  refreshProfessionals: () => Promise<void>;
  
  // Modals & Panels
  selectedProForProfile: Professional | null;
  setSelectedProForProfile: (pro: Professional | null) => void;
  selectedProForBooking: Professional | null;
  setSelectedProForBooking: (pro: Professional | null) => void;
  
  // Contact Unlock
  unlockTargetPro: Professional | null;
  setUnlockTargetPro: (pro: Professional | null) => void;
  unlocks: ContactUnlock[];
  handleUnlockContact: (pro: Professional) => Promise<boolean>;
  
  isHelpMeChooseOpen: boolean;
  setIsHelpMeChooseOpen: (open: boolean) => void;
  isStampCalcOpen: boolean;
  setIsStampCalcOpen: (open: boolean) => void;
  isSeoAuditOpen: boolean;
  setIsSeoAuditOpen: (open: boolean) => void;
  isWhatsAppDrawerOpen: boolean;
  setIsWhatsAppDrawerOpen: (open: boolean) => void;
  
  // Bookings & Workflow
  userBookings: Booking[];
  refreshBookings: () => Promise<void>;
  handleCreateBooking: (bookingData: any) => Promise<Booking>;
  handleAcceptBooking: (bookingId: string) => Promise<void>;
  handleRejectBooking: (bookingId: string, reason?: string) => Promise<void>;
  handleSuggestTime: (bookingId: string, newDate: string, newTime: string, note?: string) => Promise<void>;
  handleAcceptAlternativeTime: (bookingId: string) => Promise<void>;
  
  // WhatsApp Messages Feed
  whatsAppMessages: WhatsAppMessage[];
  refreshWhatsAppMessages: () => Promise<void>;
  
  // Leads
  leads: Lead[];
  refreshLeads: () => Promise<void>;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [activeView, setActiveView] = useState<ActiveViewType>('home');
  
  // Role & Auth state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(mockUsers[0]); // Default to Vivek Ranjan (Customer)
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');

  const [filters, setFilters] = useState<ProfessionalFilters>({
    category: 'All',
    district: 'All',
    location: '',
    officeType: 'All',
    searchQuery: '',
    sortBy: 'rating',
    verifiedOnly: false
  });

  const [activeSearchQuery, setActiveSearchQuery] = useState<SearchQueryObject | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loadingPros, setLoadingPros] = useState<boolean>(true);

  const [selectedProForProfile, setSelectedProForProfile] = useState<Professional | null>(null);
  const [selectedProForBooking, setSelectedProForBooking] = useState<Professional | null>(null);
  const [unlockTargetPro, setUnlockTargetPro] = useState<Professional | null>(null);
  
  const [isHelpMeChooseOpen, setIsHelpMeChooseOpen] = useState<boolean>(false);
  const [isStampCalcOpen, setIsStampCalcOpen] = useState<boolean>(false);
  const [isSeoAuditOpen, setIsSeoAuditOpen] = useState<boolean>(false);
  const [isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen] = useState<boolean>(false);
  
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [unlocks, setUnlocks] = useState<ContactUnlock[]>([]);
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[lang]?.[key] || translations.en[key] || String(key);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openAuthModal = (mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'customer') {
      setCurrentUser(mockUsers[0]);
      showToast('Switched to Customer mode (Vivek Ranjan - LCU-001248)', 'info');
    } else if (role === 'professional') {
      setCurrentUser(mockUsers[1]);
      showToast('Switched to Professional mode (Rajesh Kumar Singh, Katib - LCP-000492)', 'info');
    } else if (role === 'admin') {
      setCurrentUser(mockUsers[2]);
      showToast('Switched to Administrator mode (LCA-000001)', 'info');
    } else {
      setCurrentUser(null);
      showToast('Logged out to Guest Mode', 'info');
    }
  };

  const loginUser = (account: Partial<UserAccount>) => {
    const fullAccount: UserAccount = {
      id: account.id || `LCU-${Math.floor(100000 + Math.random() * 900000)}`,
      name: account.name || 'Demo User',
      mobile: account.mobile || '+91 98000 00000',
      whatsapp: account.whatsapp || account.mobile || '+91 98000 00000',
      email: account.email || 'user@example.com',
      role: account.role || 'customer',
      district: account.district || 'Patna',
      location: account.location || 'Patna Sadar',
      category: account.category,
      verificationStatus: account.verificationStatus || 'Verified',
      licenseNumber: account.licenseNumber,
      experienceYears: account.experienceYears || 5,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(fullAccount);
    setCurrentRole(fullAccount.role);
    closeAuthModal();
    showToast(`Welcome back, ${fullAccount.name}! Logged in as ${fullAccount.role.toUpperCase()}`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    setActiveView('home');
    showToast('Successfully logged out.', 'info');
  };

  const refreshProfessionals = useCallback(async () => {
    setLoadingPros(true);
    try {
      const data = await professionalService.getProfessionals(filters);
      setProfessionals(data);
    } catch (err) {
      console.error(err);
      showToast('Failed to load professionals', 'error');
    } finally {
      setLoadingPros(false);
    }
  }, [filters]);

  const refreshBookings = useCallback(async () => {
    try {
      const data = await professionalService.getBookings();
      setUserBookings(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const refreshWhatsAppMessages = useCallback(async () => {
    try {
      const data = await professionalService.getWhatsAppMessages();
      setWhatsAppMessages(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const refreshLeads = useCallback(async () => {
    try {
      const data = await professionalService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const refreshUnlocks = useCallback(async () => {
    try {
      const data = await professionalService.getContactUnlocks();
      setUnlocks(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    refreshProfessionals();
    refreshBookings();
    refreshWhatsAppMessages();
    refreshLeads();
    refreshUnlocks();
  }, [refreshProfessionals, refreshBookings, refreshWhatsAppMessages, refreshLeads, refreshUnlocks]);

  const updateFilter = (key: keyof ProfessionalFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      district: 'All',
      location: '',
      officeType: 'All',
      searchQuery: '',
      sortBy: 'rating',
      verifiedOnly: false
    });
    setActiveSearchQuery(null);
  };

  const executeSearchQuery = (query: SearchQueryObject) => {
    setActiveSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      category: query.professionalType || 'All',
      district: query.district || 'All',
      location: query.location || ''
    }));
    setActiveView('professionals');
  };

  const handleCreateBooking = async (bookingData: any): Promise<Booking> => {
    const booking = await professionalService.createBooking({
      ...bookingData,
      userId: currentUser?.id || 'LCU-001248',
      clientName: bookingData.clientName || currentUser?.name || 'Vivek Ranjan',
      clientPhone: bookingData.clientPhone || currentUser?.mobile || '+91 98765 43210',
      clientWhatsapp: bookingData.clientWhatsapp || currentUser?.whatsapp || bookingData.clientPhone
    });
    await refreshBookings();
    await refreshWhatsAppMessages();
    showToast(`Booking request ${booking.bookingNumber} submitted! Professional alerted via WhatsApp.`, 'success');
    return booking;
  };

  const handleAcceptBooking = async (bookingId: string) => {
    await professionalService.acceptBooking(bookingId);
    await refreshBookings();
    await refreshWhatsAppMessages();
    showToast('Booking ACCEPTED! Confirmation dispatched via WhatsApp.', 'success');
  };

  const handleRejectBooking = async (bookingId: string, reason?: string) => {
    await professionalService.rejectBooking(bookingId, reason);
    await refreshBookings();
    await refreshWhatsAppMessages();
    showToast('Booking rejected. Token refunded to user wallet.', 'info');
  };

  const handleSuggestTime = async (bookingId: string, newDate: string, newTime: string, note?: string) => {
    await professionalService.suggestAlternativeTime(bookingId, newDate, newTime, note);
    await refreshBookings();
    await refreshWhatsAppMessages();
    showToast('Alternative time proposed! User notified via WhatsApp.', 'success');
  };

  const handleAcceptAlternativeTime = async (bookingId: string) => {
    await professionalService.acceptAlternativeTime(bookingId);
    await refreshBookings();
    await refreshWhatsAppMessages();
    showToast('New slot confirmed with professional!', 'success');
  };

  const handleUnlockContact = async (pro: Professional): Promise<boolean> => {
    try {
      const unlock = await professionalService.unlockContact(currentUser?.id || 'LCU-001248', pro);
      await refreshUnlocks();
      showToast(`Contact unlocked for ${pro.name}! Phone and chamber details revealed.`);
      return true;
    } catch (e) {
      showToast('Failed to unlock contact', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        activeView,
        setActiveView,
        currentUser,
        currentRole,
        switchRole,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        activeSearchQuery,
        setActiveSearchQuery,
        executeSearchQuery,
        professionals,
        loadingPros,
        refreshProfessionals,
        selectedProForProfile,
        setSelectedProForProfile,
        selectedProForBooking,
        setSelectedProForBooking,
        unlockTargetPro,
        setUnlockTargetPro,
        unlocks,
        handleUnlockContact,
        isHelpMeChooseOpen,
        setIsHelpMeChooseOpen,
        isStampCalcOpen,
        setIsStampCalcOpen,
        isSeoAuditOpen,
        setIsSeoAuditOpen,
        isWhatsAppDrawerOpen,
        setIsWhatsAppDrawerOpen,
        userBookings,
        refreshBookings,
        handleCreateBooking,
        handleAcceptBooking,
        handleRejectBooking,
        handleSuggestTime,
        handleAcceptAlternativeTime,
        whatsAppMessages,
        refreshWhatsAppMessages,
        leads,
        refreshLeads,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
