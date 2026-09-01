import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react';
import { BIHAR_DISTRICTS } from '../../constants/biharData';
import { PRIMARY_NAVIGATION } from '../../constants/navigation';
import legalcureLogo from '../../assets/images/legalcure_logo_1786984287741.jpg';

export const Footer: React.FC = () => {
  const { lang, updateFilter, setActiveView, setIsHelpMeChooseOpen } = useApp();

  const handleDistrictClick = (districtName: string) => {
    updateFilter('district', districtName);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#082B63] text-blue-100 pt-16 pb-24 md:pb-12 border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/50">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-amber-400/40 flex items-center justify-center bg-[#05162e] shrink-0">
                <img 
                  src={legalcureLogo} 
                  alt="LegalCure Logo" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                LegalCure<span className="text-blue-300">.in</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'बिहार का अग्रणी भूमि व निबंधन सेवा मंच। पटना, भागलपुर, मुजफ्फरपुर, गया सहित सभी 38 जिलों में लाइसेंस प्राप्त कातिब (Deed Writer) एवं सरकारी अमीन (Land Surveyor) से सीधा संपर्क।'
                : 'Bihar’s premier marketplace for verified land registry deed writers (Katib) and certified amin land surveyors across all 38 districts.'}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-blue-200/90">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>Helpline: +91 612 2294 100 / +91 94312 00000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span>support@legalcure.in | help@biharbhumi.legalcure.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>LegalCure Hub, Exhibition Road / Fraser Road, Patna, Bihar 800001</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              {PRIMARY_NAVIGATION.map((item) => (
                <li key={`footer-${item.id}`}>
                  <button 
                    onClick={() => {
                      setActiveView(item.view);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {lang === 'hi' ? item.labelHi : item.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Phase 1 Specialized Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'सत्यापित सेवाएं' : 'Verified Services'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'Deed Writer'); setActiveView('professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  {lang === 'hi' ? 'केवाला (दस्तावेज लेखक / कातिब)' : 'Sale Deed (Kewala) Writers'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'Amin / Land Surveyor'); setActiveView('professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  {lang === 'hi' ? 'अमीन जमीन नापी (Amin Surveyor)' : 'Amin Land Surveyors (Katha/Dhur)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsHelpMeChooseOpen(true)}
                  className="hover:text-white flex items-center gap-1.5 transition-colors text-left text-amber-300 font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'हेल्प मी चूज (गाइड)' : 'Help Me Choose Wizard'}</span>
                </button>
              </li>
              <li>
                <a 
                  href="http://biharbhumi.bihar.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Bihar Bhumi Portal</span>
                  <ExternalLink className="w-3 h-3 text-blue-300/60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://registration.bihar.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Bihar Registration Dept</span>
                  <ExternalLink className="w-3 h-3 text-blue-300/60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Top Districts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'प्रमुख जिले' : 'Top Bihar Districts'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BIHAR_DISTRICTS.slice(0, 10).map(d => (
                <button
                  key={d.name}
                  onClick={() => handleDistrictClick(d.name)}
                  className="text-[11px] bg-blue-900/60 hover:bg-[#0B3D91] px-2.5 py-1 rounded-md text-blue-100 transition-colors border border-blue-800/40"
                >
                  {lang === 'hi' ? d.nameHi : d.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Token Protection */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>
              {lang === 'hi' 
                ? '₹100 लीगलक्योर टोकन सुरक्षा: यदि आपका परामर्श तय समय पर नहीं होता, तो 100% धनवापसी गारंटी।'
                : '₹100 LegalCure Token Guarantee: 100% money-back protection if consultation fails to take place.'}
            </span>
          </div>

          <div className="text-center md:text-right text-[11px]">
            © {new Date().getFullYear()} LegalCure.in. All Rights Reserved. Bihar Land & Registry Marketplace.
          </div>
        </div>
      </div>
    </footer>
  );
};
