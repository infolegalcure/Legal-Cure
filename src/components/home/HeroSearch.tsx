import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { ProfessionalSearch } from '../search/ProfessionalSearch';

export const HeroSearch: React.FC = () => {
  const { lang, executeSearchQuery, setIsHelpMeChooseOpen } = useApp();

  const handleQuickTag = (pro: string, dist: string, loc: string) => {
    executeSearchQuery({
      professionalType: pro,
      district: dist,
      location: loc,
      timestamp: Date.now()
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#082B63] pt-12 pb-20 px-4 sm:px-8 relative overflow-hidden shrink-0" id="hero-search-section">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 mb-6 backdrop-blur-md shadow-xs">
          <Shield className="w-3.5 h-3.5 text-[#10B981]" />
          <span>
            {lang === 'hi'
              ? 'बिहार सरकार निबंधन लाइसेंस प्राप्त कातिब एवं सरकारी अमीन'
              : 'Verified Bihar Deed Writers (Katib) & Amin Surveyors'}
          </span>
        </div>

        {/* Master Hero Headings */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight max-w-4xl mx-auto font-sans">
          {lang === 'hi'
            ? 'बिहार का सबसे भरोसेमंद भूमि एवं निबंधन सेवा मंच'
            : 'Find a Land Service Professional in Bihar'}
        </h1>

        <p className="text-blue-100 text-sm sm:text-base mb-8 max-w-3xl mx-auto opacity-90 font-normal leading-relaxed">
          {lang === 'hi'
            ? 'अपने सब-रजिस्ट्री ऑफिस के लाइसेंसधारी कातिब (दस्तावेज लेखक) और अंचल के सरकारी प्रशिक्षित अमीन से सीधे संपर्क करें।'
            : 'Connect with verified Deed Writers (Katibs) at Sub-Registry Offices and certified Amin Surveyors across Bihar revenue blocks.'}
        </p>

        {/* Unified 3-Level Conditional Search Component */}
        <div className="max-w-4xl mx-auto">
          <ProfessionalSearch variant="hero" />
        </div>

        {/* Help guide */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-200">
          <span>{lang === 'hi' ? 'समझ नहीं आ रहा किसे चुनें?' : 'Need guidance on your land service?'}</span>
          <button
            onClick={() => setIsHelpMeChooseOpen(true)}
            className="inline-flex items-center gap-1 text-white font-bold underline hover:text-blue-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            {lang === 'hi' ? 'हेल्प मी चूज (गाइड)' : 'Help Me Choose (Guide)'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Recommended Phase-1 Searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-blue-300 font-medium">{lang === 'hi' ? 'लोकप्रिय खोजें:' : 'Quick Searches:'}</span>
          <button
            onClick={() => handleQuickTag('Deed Writer', 'Patna', 'Patna Sadar Registry Office')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            {lang === 'hi' ? 'कातिब • पटना सदर' : 'Deed Writer • Patna Sadar'}
          </button>
          <button
            onClick={() => handleQuickTag('Amin / Land Surveyor', 'Patna', 'Danapur')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            {lang === 'hi' ? 'अमीन • दानापुर' : 'Amin • Danapur'}
          </button>
          <button
            onClick={() => handleQuickTag('Deed Writer', 'Muzaffarpur', 'Muzaffarpur Registry Office')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            {lang === 'hi' ? 'कातिब • मुजफ्फरपुर' : 'Deed Writer • Muzaffarpur'}
          </button>
          <button
            onClick={() => handleQuickTag('Amin / Land Surveyor', 'Muzaffarpur', 'Kanti')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            {lang === 'hi' ? 'अमीन • कांटी' : 'Amin • Kanti'}
          </button>
        </div>

      </div>
    </section>
  );
};
