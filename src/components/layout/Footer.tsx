import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Calculator, HelpCircle, BookOpen, MessageSquare, Award } from 'lucide-react';
import { BIHAR_DISTRICTS } from '../../constants/biharData';

export const Footer: React.FC = () => {
  const { lang, updateFilter, setActiveView, setIsStampCalcOpen, setIsHelpMeChooseOpen, setIsSeoAuditOpen } = useApp();

  const handleDistrictClick = (districtName: string) => {
    updateFilter('district', districtName);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string) => {
    updateFilter('category', category);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 12 key Bihar registry hubs for quick SEO links
  const topHubs = [
    { name: 'Patna Sadar', district: 'Patna' },
    { name: 'Danapur', district: 'Patna' },
    { name: 'Muzaffarpur', district: 'Muzaffarpur' },
    { name: 'Bhagalpur Sadar', district: 'Bhagalpur' },
    { name: 'Gaya Sadar', district: 'Gaya' },
    { name: 'Darbhanga', district: 'Darbhanga' },
    { name: 'Purnea', district: 'Purnea' },
    { name: 'Begusarai', district: 'Begusarai' },
    { name: 'Samastipur', district: 'Samastipur' },
    { name: 'Chapra / Saran', district: 'Saran' },
    { name: 'Ara / Bhojpur', district: 'Bhojpur' },
    { name: 'Hajipur / Vaishali', district: 'Vaishali' }
  ];

  return (
    <footer className="bg-[#082B63] text-blue-100 pt-16 pb-24 md:pb-12 border-t border-blue-900/60" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/50">
          
          {/* Brand & Mission Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0B3D91] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
                L
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                LegalCure<span className="text-blue-300">.in</span>
              </span>
            </div>
            
            <p className="text-sm text-blue-200/80 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'बिहार का अग्रणी भूमि सेवा एवं निबंधन मंच। राज्य के सभी 38 जिलों में निबंधन कार्यालय लाइसेंस प्राप्त कातिब (Deed Writer) एवं सरकारी प्रमाणित अमीन (Land Surveyor) से सीधा और पारदर्शी संपर्क।'
                : 'Bihar’s dedicated land service marketplace connecting property buyers and landowners directly with licensed Deed Writers (Katib) and certified Amin Land Surveyors across all 38 districts.'}
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-blue-200/90">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>Helpline / WhatsApp: +91 612 2294 100 / +91 94312 88410</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span>support@legalcure.in | desk@biharbhumi.legalcure.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>LegalCure HQ: Fraser Road / Exhibition Road, Patna, Bihar 800001</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Token Protection & Advance Security</span>
              </span>
            </div>
          </div>

          {/* Phase 1 Active Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'सक्रिय सेवाएं (Phase 1)' : 'Active Services (Phase 1)'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button 
                  onClick={() => handleCategoryClick('Deed Writer')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{lang === 'hi' ? 'दस्तावेज लेखक (कातिब / Kewala)' : 'Deed Writer (Katib / Kewala)'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('Amin / Land Surveyor')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{lang === 'hi' ? 'अमीन भू-सर्वेयर (Land Measurement)' : 'Amin / Land Surveyor (Naapi)'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsStampCalcOpen(true)}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Calculator className="w-3 h-3 text-[#F59E0B]" />
                  <span>{lang === 'hi' ? 'बिहार स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Duty Calculator'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('knowledge_center'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-blue-300" />
                  <span>{lang === 'hi' ? 'बिहार जमीन नियम व शब्दावली' : 'Bihar Land Lexicon & Rules'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('for_professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'hi' ? 'कातिब / अमीन बनें (पंजीकरण)' : 'Join as Verified Pro'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'प्रमुख रजिस्ट्री हब' : 'Popular Registry Hubs'}
            </h4>
            <ul className="space-y-1.5 text-xs text-blue-200/80">
              {topHubs.slice(0, 6).map((hub, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleDistrictClick(hub.district)}
                    className="hover:text-white transition-colors hover:underline text-left block"
                  >
                    {hub.name} ({hub.district})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Portals & Trust */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              {lang === 'hi' ? 'पोर्टल एवं सहायता' : 'Platform & Compliance'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button 
                  onClick={() => { setActiveView('pro_dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  {lang === 'hi' ? 'कातिब / अमीन डैशबोर्ड' : 'Professional Dashboard'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  {lang === 'hi' ? 'एडमिन सत्यापन डेस्क' : 'Admin Verification Desk'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSeoAuditOpen(true)}
                  className="hover:text-emerald-300 text-emerald-400 transition-colors text-left font-semibold"
                >
                  Technical SEO Audit Panel
                </button>
              </li>
              <li>
                <a 
                  href="http://biharbhumi.bihar.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Bihar Bhumi Official (Govt)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              </li>
              <li>
                <a 
                  href="http://registration.bihar.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Bihar e-Nibandhan (Govt)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 38 Districts Micro-Directory */}
        <div className="py-8 border-b border-blue-900/50">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 mb-3">
            {lang === 'hi' ? 'बिहार के सभी 38 जिलों में सेवाएं:' : 'All 38 Bihar Districts Directory:'}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-blue-200/70">
            {BIHAR_DISTRICTS.map((d) => (
              <button
                key={d.name}
                onClick={() => handleDistrictClick(d.name)}
                className="hover:text-white hover:underline transition-colors"
              >
                {d.name} ({lang === 'hi' ? d.nameHi : d.name})
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/60">
          <div>
            © {new Date().getFullYear()} LegalCure.in — Bihar Land Service Marketplace. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-amber-300/90 font-medium">
              [DEMO DATA - FOR PROTOTYPE PURPOSES ONLY]
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => setIsHelpMeChooseOpen(true)}>
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => setIsHelpMeChooseOpen(true)}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
