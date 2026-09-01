import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Professional, 
  Booking, 
  SearchQueryObject, 
  UserAccount, 
  UserRole,
  WhatsAppMessage 
} from '../types';
import { translations } from '../constants/translations';
import { professionalService, ProfessionalFilters } from '../services/professionalService';
import { supabaseDataService } from '../services/supabaseDataService';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export type ActiveView = 
  | 'home' 
  | 'professionals' 
  | 'how_it_works' 
  | 'for_professionals' 
  | 'knowledge_center' 
  | 'support' 
  | 'bookings' 
  | 'pro_dashboard' 
  | 'admin'
  | 'pro_register';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations.en) => string;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  // Auth & User State
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'forgot') => void;
  authModalRole: UserRole;
  setAuthModalRole: (role: UserRole) => void;
  openAuthModal: (tab?: 'login' | 'forgot', role?: UserRole) => void;
  closeAuthModal: () => void;
  loginUser: (email: string, password?: string) => Promise<UserAccount>;
  signupUser: (data: Partial<UserAccount>) => Promise<UserAccount>;
  logoutUser: () => void;
  switchRole: (role: UserRole) => void;

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
  
  // Modals
  selectedProForProfile: Professional | null;
  setSelectedProForProfile: (pro: Professional | null) => void;
  selectedProForBooking: Professional | null;
  setSelectedProForBooking: (pro: Professional | null) => void;
  
  isHelpMeChooseOpen: boolean;
  setIsHelpMeChooseOpen: (open: boolean) => void;
  isStampCalcOpen: boolean;
  setIsStampCalcOpen: (open: boolean) => void;
  
  // Notifications & WhatsApp
  isWhatsAppDrawerOpen: boolean;
  setIsWhatsAppDrawerOpen: (open: boolean) => void;
  whatsAppMessages: WhatsAppMessage[];
  sendWhatsAppNotification: (templateKey: string, recipientPhone: string, body: string, bookingNumber?: string) => void;

  // Bookings
  userBookings: Booking[];
  refreshBookings: () => Promise<void>;
  
  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  
  // Auth state (defaults to guest, can be logged in)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'forgot'>('login');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('customer');

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
  
  const [isHelpMeChooseOpen, setIsHelpMeChooseOpen] = useState<boolean>(false);
  const [isStampCalcOpen, setIsStampCalcOpen] = useState<boolean>(false);
  
  const [isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen] = useState<boolean>(false);
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessage[]>([
    {
      id: 'wa-init-1',
      templateKey: 'SYSTEM_WELCOME',
      recipientPhone: '+91 94312 00000',
      recipientRole: 'Client',
      messageBody: 'Welcome to LegalCure Bihar! You will receive verified booking confirmations, Katib shed directions, and Amin schedule updates here.',
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [userBookings, setUserBookings] = useState<Booking[]>([]);
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

  const openAuthModal = (tab: 'login' | 'forgot' = 'login', role: UserRole = 'customer') => {
    setAuthModalTab(tab);
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginUser = async (email: string, password?: string): Promise<UserAccount> => {
    let user: UserAccount | null = null;

    // Try real Supabase auth first
    if (isSupabaseConfigured && password) {
      user = await supabaseDataService.signInUser(email, password);
    }

    if (!user) {
      const lowerEmail = email.toLowerCase();
      if (lowerEmail.includes('katib') || lowerEmail.includes('amin') || lowerEmail.includes('pro')) {
        user = {
          id: 'usr-pro-101',
          name: 'Ramesh Kumar Sinha (Deed Writer)',
          email: email || 'ramesh.katib.patna@legalcure.in',
          phone: '+91 94312 88771',
          role: 'professional',
          district: 'Patna',
          location: 'Patna Sadar Registry Office',
          licenseNumber: 'BR-REG-PAT-2012-089'
        };
      } else if (lowerEmail.includes('admin')) {
        user = {
          id: 'usr-admin-01',
          name: 'State Verification Officer',
          email: email || 'admin@legalcure.in',
          phone: '+91 612 2294 100',
          role: 'admin',
          district: 'Patna',
          location: 'Exhibition Road HQ'
        };
      } else {
        user = {
          id: 'usr-cust-201',
          name: email.split('@')[0] || 'LegalCure Client',
          email: email || 'user@legalcure.in',
          phone: '+91 98350 12345',
          role: 'customer',
          district: 'Patna',
          location: 'Patna Sadar'
        };
      }
    }

    setCurrentUser(user);
    try {
      localStorage.setItem('legalcure_active_user', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  };

  const signupUser = async (data: Partial<UserAccount> & { password?: string }): Promise<UserAccount> => {
    let user: UserAccount;

    if (isSupabaseConfigured && data.email && data.name && data.phone) {
      const res = await supabaseDataService.signUpCustomer({
        fullName: data.name,
        mobile: data.phone,
        email: data.email,
        password: data.password,
        district: data.district
      });
      user = res.user;
    } else {
      user = {
        id: `usr-${Date.now()}`,
        name: data.name || 'New LegalCure User',
        email: data.email || 'user@legalcure.in',
        phone: data.phone || '+91 99999 99999',
        role: data.role || 'customer',
        district: data.district || 'Patna',
        location: data.location || 'Patna Sadar',
        licenseNumber: data.licenseNumber
      };
    }

    setCurrentUser(user);
    try {
      localStorage.setItem('legalcure_active_user', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Account created successfully!`, 'success');
    return user;
  };

  const logoutUser = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(() => {});
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('legalcure_active_user');
    } catch (e) {
      console.warn(e);
    }
    showToast('Logged out successfully', 'info');
    setActiveView('home');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'professional') {
      setCurrentUser({
        id: 'usr-pro-101',
        name: 'Ramesh Kumar Sinha (Deed Writer)',
        email: 'ramesh.katib.patna@legalcure.in',
        phone: '+91 94312 88771',
        role: 'professional',
        district: 'Patna',
        location: 'Patna Sadar Registry Office',
        licenseNumber: 'BR-REG-PAT-2012-089'
      });
      setActiveView('pro_dashboard');
    } else if (newRole === 'admin') {
      setCurrentUser({
        id: 'usr-admin-01',
        name: 'State Verification Officer',
        email: 'admin@legalcure.in',
        phone: '+91 612 2294 100',
        role: 'admin',
        district: 'Patna',
        location: 'Exhibition Road HQ'
      });
      setActiveView('admin');
    } else {
      setCurrentUser({
        id: 'usr-cust-201',
        name: 'Vivek Anand',
        email: 'vivek.patna@gmail.com',
        phone: '+91 98350 12345',
        role: 'customer',
        district: 'Patna',
        location: 'Kankarbagh / Sadar'
      });
      setActiveView('home');
    }
    showToast(`Switched active view to ${newRole} mode`, 'info');
  };

  const sendWhatsAppNotification = (templateKey: string, recipientPhone: string, body: string, bookingNumber?: string) => {
    const newMsg: WhatsAppMessage = {
      id: `wa-${Date.now()}`,
      templateKey,
      recipientPhone,
      recipientRole: 'Client',
      messageBody: body,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bookingNumber
    };
    setWhatsAppMessages(prev => [newMsg, ...prev]);
    showToast('WhatsApp Notification sent to ' + recipientPhone, 'info');
  };

  const executeSearchQuery = (query: SearchQueryObject) => {
    setActiveSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      category: query.professionalType,
      district: query.district,
      location: query.location
    }));
    setActiveView('professionals');
  };

  const refreshProfessionals = async () => {
    setLoadingPros(true);
    try {
      const data = await professionalService.getProfessionals(filters);
      setProfessionals(data);
    } catch (e) {
      console.error(e);
      showToast('Error loading professionals', 'error');
    } finally {
      setLoadingPros(false);
    }
  };

  const refreshBookings = async () => {
    try {
      const data = await professionalService.getBookings();
      setUserBookings(data);
    } catch (e) {
      console.error(e);
    }
  };

  const updateFilter = (key: keyof ProfessionalFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setActiveSearchQuery(null);
    setFilters({
      category: 'All',
      district: 'All',
      location: '',
      officeType: 'All',
      searchQuery: '',
      sortBy: 'rating',
      verifiedOnly: false
    });
  };

  useEffect(() => {
    refreshProfessionals();
  }, [filters]);

  useEffect(() => {
    refreshBookings();
  }, []);

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
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        authModalRole,
        setAuthModalRole,
        openAuthModal,
        closeAuthModal,
        loginUser,
        signupUser,
        logoutUser,
        switchRole,
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
        isHelpMeChooseOpen,
        setIsHelpMeChooseOpen,
        isStampCalcOpen,
        setIsStampCalcOpen,
        isWhatsAppDrawerOpen,
        setIsWhatsAppDrawerOpen,
        whatsAppMessages,
        sendWhatsAppNotification,
        userBookings,
        refreshBookings,
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
