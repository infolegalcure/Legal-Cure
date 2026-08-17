import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Building, UserCheck, HelpCircle, ArrowRight, Shield } from 'lucide-react';
import { BIHAR_DISTRICTS } from '../../constants/biharData';

export const HeroSearch: React.FC = () => {
  const { lang, filters, updateFilter, setActiveView, setIsHelpMeChooseOpen, t } = useApp();

  const [selectedCat, setSelectedCat] = useState(filters.category || 'All');
  const [selectedDist, setSelectedDist] = useState(filters.district || 'Patna');
  const [selectedOffice, setSelectedOffice] = useState(filters.officeType || 'All');

  // Find offices for selected district
  const districtObj = BIHAR_DISTRICTS.find(d => d.name === selectedDist);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('category', selectedCat);
    updateFilter('district', selectedDist);
    updateFilter('officeType', selectedOffice);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTag = (category: string, district?: string) => {
    updateFilter('category', category);
    if (district) updateFilter('district', district);
    setActiveView('professionals');
  };

  return (
    <section className="bg-[#082B63] pt-12 pb-24 px-4 sm:px-10 relative overflow-hidden shrink-0">
      {/* Sleek Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 mb-6 backdrop-blur-md shadow-xs">
          <Shield className="w-3.5 h-3.5 text-[#10B981]" />
          <span>{lang === 'hi' ? 'बिहार सरकार निबंधन लाइसेंस प्राप्त विशेषज्ञ' : 'Verified Experts for Bihar Land & Property'}</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight max-w-4xl mx-auto">
          {lang === 'hi' ? (
            <>
              अपनी जमीन और रजिस्ट्री के लिए <br className="hidden sm:inline" />
              <span className="text-blue-200">सत्यापित विशेषज्ञ</span> खोजें
            </>
          ) : (
            <>
              Verified Experts for <br className="hidden sm:inline" />
              <span className="text-blue-200">Bihar Land & Property</span>
            </>
          )}
        </h1>

        <p className="text-blue-100 text-sm sm:text-base mb-10 max-w-2xl mx-auto opacity-90 font-normal leading-relaxed">
          {lang === 'hi'
            ? 'बिहार के 38 जिलों में केवाला (कातिब), जमीन नापी (अमीन), और रजिस्ट्री ऑफिस अधिवक्ताओं से सीधे जुड़ें।'
            : 'Connect with trusted Deed Writers, Surveyors, and Lawyers at your local Registry Office.'}
        </p>

        {/* Sleek Search Box */}
        <form 
          onSubmit={handleSearch}
          className="max-w-5xl mx-auto bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 text-slate-800"
          id="hero-search-form"
        >
          {/* Step 1: Category */}
          <div className="w-full md:flex-1 px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col text-left">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-left">
              {lang === 'hi' ? 'प्रोफेशनल प्रकार' : 'Professional Type'}
            </label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full text-sm font-bold text-[#082B63] bg-transparent outline-none appearance-none cursor-pointer"
              id="search-category-select"
            >
              <option value="All">{lang === 'hi' ? 'सभी श्रेणियां' : 'All Professional Types'}</option>
              <option value="Deed Writer">{lang === 'hi' ? 'कातिब / दस्तावेज लेखक (Deed Writer)' : 'Deed Writer (कातिब)'}</option>
              <option value="Lawyer">{lang === 'hi' ? 'जमीन व संपत्ति वकील' : 'Property Lawyer'}</option>
              <option value="Amin / Land Surveyor">{lang === 'hi' ? 'अमीन / भूमि सर्वेयर' : 'Land Surveyor (अमीन)'}</option>
              <option value="Notary">{lang === 'hi' ? 'नोटरी पब्लिक' : 'Notary Public'}</option>
              <option value="Document Checker">{lang === 'hi' ? 'दाखिल खारिज व खतियान जांच' : 'Mutation & Khatian Auditor'}</option>
            </select>
          </div>

          {/* Step 2: District */}
          <div className="w-full md:flex-1 px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col text-left">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-left">
              {lang === 'hi' ? 'जिला (38 Districts)' : 'District'}
            </label>
            <select
              value={selectedDist}
              onChange={(e) => setSelectedDist(e.target.value)}
              className="w-full text-sm font-bold text-[#082B63] bg-transparent outline-none appearance-none cursor-pointer"
              id="search-district-select"
            >
              <option value="All">{lang === 'hi' ? 'सभी 38 जिले' : 'All 38 Districts'}</option>
              {BIHAR_DISTRICTS.map(d => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.nameHi})
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Working Area / Office */}
          <div className="w-full md:flex-1 px-6 py-2 flex flex-col text-left">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-left">
              {lang === 'hi' ? 'प्रखंड / रजिस्ट्री ऑफिस' : 'Block / Registry Office'}
            </label>
            <select
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(e.target.value)}
              className="w-full text-sm font-bold text-[#082B63] bg-transparent outline-none appearance-none cursor-pointer truncate"
              id="search-office-select"
            >
              <option value="All">{lang === 'hi' ? 'सभी रजिस्ट्री कार्यालय' : 'All Registry & Block Offices'}</option>
              <option value="Registry Office">{lang === 'hi' ? 'निबंधन कार्यालय (Registry Office)' : 'Registry Office Campus'}</option>
              <option value="Block Office">{lang === 'hi' ? 'प्रखंड / अंचल कार्यालय' : 'Block / Circle Office'}</option>
              <option value="Civil Court">{lang === 'hi' ? 'व्यवहार न्यायालय (Civil Court)' : 'Civil Court & Chamber'}</option>
              <option value="Independent Chamber">{lang === 'hi' ? 'निजी चेंबर' : 'Independent Chamber'}</option>
            </select>
          </div>

          {/* Search CTA */}
          <button
            type="submit"
            id="hero-search-submit"
            className="w-full md:w-auto bg-[#0B3D91] text-white px-8 h-12 rounded-full font-bold text-sm hover:bg-[#082B63] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{t('search_btn')}</span>
          </button>
        </form>

        {/* Wizard trigger */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-200">
          <span>{lang === 'hi' ? 'समझ नहीं आ रहा किसे चुनें?' : 'Not sure which professional you need?'}</span>
          <button
            onClick={() => setIsHelpMeChooseOpen(true)}
            className="inline-flex items-center gap-1 text-white font-bold underline hover:text-blue-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            {lang === 'hi' ? 'हेल्प मी चूज (20 सेकंड गाइड)' : 'Help Me Choose (Decision Tree)'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Popular Quick Searches */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-blue-300 font-medium">{lang === 'hi' ? 'त्वरित खोज:' : 'Popular:'}</span>
          <button
            onClick={() => handleQuickTag('Deed Writer', 'Patna')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            Patna Deed Writer
          </button>
          <button
            onClick={() => handleQuickTag('Amin / Land Surveyor', 'Bhagalpur')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            Bhagalpur Amin (नापी)
          </button>
          <button
            onClick={() => handleQuickTag('Lawyer', 'Muzaffarpur')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            Muzaffarpur Land Lawyer
          </button>
          <button
            onClick={() => handleQuickTag('Notary', 'Gaya')}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-xs transition-colors"
          >
            Gaya Notary
          </button>
        </div>

      </div>
    </section>
  );
};
