import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Professional, Booking } from '../types';
import { translations } from '../constants/translations';
import { professionalService, ProfessionalFilters } from '../services/professionalService';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations.en) => string;
  activeView: 'home' | 'professionals' | 'how_it_works' | 'bookings' | 'pro_dashboard' | 'admin';
  setActiveView: (view: 'home' | 'professionals' | 'how_it_works' | 'bookings' | 'pro_dashboard' | 'admin') => void;
  
  // Search & Filters
  filters: ProfessionalFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProfessionalFilters>>;
  updateFilter: (key: keyof ProfessionalFilters, value: any) => void;
  resetFilters: () => void;
  
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
  const [activeView, setActiveView] = useState<'home' | 'professionals' | 'how_it_works' | 'bookings' | 'pro_dashboard' | 'admin'>('home');
  
  const [filters, setFilters] = useState<ProfessionalFilters>({
    category: 'All',
    district: 'All',
    officeType: 'All',
    searchQuery: '',
    sortBy: 'rating',
    verifiedOnly: false
  });

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loadingPros, setLoadingPros] = useState<boolean>(true);

  const [selectedProForProfile, setSelectedProForProfile] = useState<Professional | null>(null);
  const [selectedProForBooking, setSelectedProForBooking] = useState<Professional | null>(null);
  
  const [isHelpMeChooseOpen, setIsHelpMeChooseOpen] = useState<boolean>(false);
  const [isStampCalcOpen, setIsStampCalcOpen] = useState<boolean>(false);
  
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
    setFilters({
      category: 'All',
      district: 'All',
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
        filters,
        setFilters,
        updateFilter,
        resetFilters,
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
