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
import { DeedWriterFeatureSection } from './components/home/DeedWriterFeatureSection';
import { AminFeatureSection } from './components/home/AminFeatureSection';
import { BookingStatusLifecycleSection } from './components/home/BookingStatusLifecycleSection';
import { WhatsAppSection } from './components/home/WhatsAppSection';
import { PopularLocationsSection } from './components/home/PopularLocationsSection';
import { FaqSection } from './components/home/FaqSection';
import { HowItWorks } from './components/home/HowItWorks';
import { TrustFeatures } from './components/home/TrustFeatures';

// Dedicated Page Views
import { HowItWorksView } from './components/pages/HowItWorksView';
import { ForProfessionalsView } from './components/pages/ForProfessionalsView';
import { KnowledgeCenterView } from './components/pages/KnowledgeCenterView';

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

// Auth, SEO, WhatsApp modals
import { AuthModal } from './components/auth/AuthModal';
import { SeoAuditModal } from './components/seo/SeoAuditModal';
import { WhatsAppDrawer } from './components/notifications/WhatsAppDrawer';

// AI Assistant
import { LegalCureAssistant } from './components/ai/LegalCureAssistant';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, professionals, lang } = useApp();

  // Phase 1 active professionals only (Deed Writer & Amin)
  const phase1FeaturedPros = professionals.filter(
    p => p.category === 'Deed Writer' || p.category === 'Amin / Land Surveyor'
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-gray-900 selection:bg-[#082B63]/20 selection:text-[#082B63]">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' && (
          <div>
            <HeroSearch />
            <CategoryGrid />
            <BiharStatsBanner />

            {/* Featured Phase 1 Verified Katibs & Amins */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">
                      {lang === 'hi' ? 'विशेष रूप से अनुशंसित (फेज 1)' : 'Hand-Picked Verified Experts (Phase 1)'}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded-full">
                      100% License Verified
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
                    {lang === 'hi' ? 'शीर्ष रेटेड कातिब एवं सरकारी अमीन' : 'Top Rated Bihar Deed Writers & Amin Surveyors'}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveView('professionals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#082B63] hover:text-[#0B3D91] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <span>{lang === 'hi' ? 'सभी 38 जिलों के विशेषज्ञ देखें' : 'View all across 38 districts'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase1FeaturedPros.slice(0, 3).map((pro) => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>
            </section>

            <DeedWriterFeatureSection />
            <AminFeatureSection />
            <BookingStatusLifecycleSection />
            <WhatsAppSection />
            <HowItWorks />
            <PopularLocationsSection />
            <TrustFeatures />
            <FaqSection />
          </div>
        )}

        {activeView === 'professionals' && <ProfessionalList />}
        {activeView === 'how-it-works' && <HowItWorksView />}
        {activeView === 'for-professionals' && <ForProfessionalsView />}
        {activeView === 'knowledge-center' && <KnowledgeCenterView />}
        {activeView === 'bookings' && <UserBookingsView />}
        {activeView === 'pro-dashboard' && <ProfessionalDashboardView />}
        {activeView === 'admin' && <AdminVerificationView />}
      </main>

      <Footer />
      <MobileNav />

      {/* Global Modals & Drawers */}
      <ProfessionalProfileModal />
      <BookingModal />
      <HelpMeChooseModal />
      <BiharStampDutyCalculatorModal />
      <AuthModal />
      <SeoAuditModal />
      <WhatsAppDrawer />

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
