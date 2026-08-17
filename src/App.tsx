import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/layout/ToastContainer';

// Home components
import { HeroSearch } from './components/home/HeroSearch';
import { CategoryGrid } from './components/home/CategoryGrid';
import { BiharStatsBanner } from './components/home/BiharStatsBanner';
import { HowItWorks } from './components/home/HowItWorks';
import { TrustFeatures } from './components/home/TrustFeatures';

// Professional & Booking components
import { ProfessionalList } from './components/professionals/ProfessionalList';
import { ProfessionalCard } from './components/professionals/ProfessionalCard';
import { ProfessionalProfileModal } from './components/professionals/ProfessionalProfileModal';
import { BookingModal } from './components/booking/BookingModal';
import { HelpMeChooseModal } from './components/wizard/HelpMeChooseModal';
import { BiharStampDutyCalculatorModal } from './components/calculator/BiharStampDutyCalculatorModal';

// Dashboard views
import { UserBookingsView } from './components/dashboard/UserBookingsView';
import { ProfessionalDashboardView } from './components/dashboard/ProfessionalDashboardView';
import { AdminVerificationView } from './components/dashboard/AdminVerificationView';

// AI Assistant
import { LegalCureAssistant } from './components/ai/LegalCureAssistant';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, professionals, lang } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' && (
          <div>
            <HeroSearch />
            <CategoryGrid />
            <BiharStatsBanner />

            {/* Featured Verified Professionals Preview on Homepage */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {lang === 'hi' ? 'विशेष रूप से अनुशंसित' : 'Hand-Picked Verified Experts'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 tracking-tight">
                    {lang === 'hi' ? 'शीर्ष रेटेड कातिब, वकील व अमीन' : 'Top Rated Deed Writers, Lawyers & Amin Surveyors'}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveView('professionals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-primary hover:text-navy flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <span>{lang === 'hi' ? 'सभी 38 जिलों के विशेषज्ञ देखें' : 'View all across 38 districts'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.slice(0, 3).map((pro) => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>
            </section>

            <HowItWorks />
            <TrustFeatures />
          </div>
        )}

        {activeView === 'professionals' && <ProfessionalList />}
        {activeView === 'bookings' && <UserBookingsView />}
        {activeView === 'pro-dashboard' && <ProfessionalDashboardView />}
        {activeView === 'admin' && <AdminVerificationView />}
      </main>

      <Footer />
      <MobileNav />

      {/* Global Modals */}
      <ProfessionalProfileModal />
      <BookingModal />
      <HelpMeChooseModal />
      <BiharStampDutyCalculatorModal />

      {/* Floating AI Assistant */}
      <LegalCureAssistant />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
