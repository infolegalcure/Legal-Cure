import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Scale, Compass, Stamp, FileCheck, ArrowRight } from 'lucide-react';
import { ProfessionalCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { lang, updateFilter, setActiveView } = useApp();

  const categories: {
    id: ProfessionalCategory;
    titleEn: string;
    titleHi: string;
    subEn: string;
    subHi: string;
    icon: React.ComponentType<{ className?: string }>;
    count: string;
    tagEn: string;
    tagHi: string;
  }[] = [
    {
      id: 'Deed Writer',
      titleEn: 'Deed Writer (Katib / दस्तावेज लेखक)',
      titleHi: 'दस्तावेज लेखक (कातिब / Katib)',
      subEn: 'Drafting Sale Deeds (Kewala), Gift Deeds (Hibanama), Batwarinama, and token submissions at Registry Office.',
      subHi: 'केवाला (बिक्री पत्र), दान पत्र (हिबानामा), बंटवारानामा, और रजिस्ट्री कार्यालय में दस्तावेज निष्पादन।',
      icon: FileText,
      count: '850+ Verified',
      tagEn: 'Registry Office Specialist',
      tagHi: 'निबंधन कार्यालय विशेषज्ञ'
    },
    {
      id: 'Lawyer',
      titleEn: 'Property Lawyer (राजस्व अधिवक्ता)',
      titleHi: 'जमीन व राजस्व अधिवक्ता (Lawyer)',
      subEn: '30-Year Title Search, mutation disputes before Circle Officer & DCLR, injunctions, and civil court suits.',
      subHi: '30 वर्षीय स्वामित्व जांच, दाखिल खारिज अपील (DCLR), जमीन स्थगन (Injunction) व न्यायालयीन वाद।',
      icon: Scale,
      count: '620+ Verified',
      tagEn: 'High Court & Civil Court',
      tagHi: 'हाईकोर्ट व सिविल कोर्ट'
    },
    {
      id: 'Amin / Land Surveyor',
      titleEn: 'Amin / Land Surveyor (भूमि सर्वेयर)',
      titleHi: 'सरकारी प्रशिक्षित अमीन (Amin Surveyor)',
      subEn: 'Accurate field measurement in Katha, Dhur & Decimal. Boundary demarcation (Hadbandi) & Cadastral map matching.',
      subHi: 'कट्ठा, धूर और डिसमिल में सटीक नापी, हदबंदी सीमा पिलर स्थापन और नक्शा (कैडस्ट्रल शीट) मिलान।',
      icon: Compass,
      count: '740+ Verified',
      tagEn: 'ETS & Chain Survey',
      tagHi: 'इलेक्ट्रॉनिक व जरीब पैमाइश'
    },
    {
      id: 'Notary',
      titleEn: 'Notary Public (नोटरी पब्लिक)',
      titleHi: 'नोटरी पब्लिक (Notary Public)',
      subEn: 'Affidavits, Power of Attorney (GPA/SPA), Agreement to Sale attestation with official seal & register entry.',
      subHi: 'शपथ पत्र (Affidavit), मुख्तारनामा (GPA), बिक्री इकरारनामा प्रमाणीकरण और सरकारी रजिस्टर प्रविष्टि।',
      icon: Stamp,
      count: '310+ Verified',
      tagEn: 'Govt Appointed',
      tagHi: 'भारत सरकार नियुक्त'
    },
    {
      id: 'Document Checker',
      titleEn: 'Mutation & Khatian Auditor',
      titleHi: 'दाखिल खारिज व खतियान परीक्षक',
      subEn: 'Online Jamabandi verification on Bihar Bhumi, CS/RS Khatian analysis, LPC status, and title audit.',
      subHi: 'बिहार भूमि पोर्टल जमाबंदी जांच, खतियान रिकॉर्ड मिलान, एलपीसी प्रमाण पत्र और फर्जीवाड़े से बचाव।',
      icon: FileCheck,
      count: '180+ Verified',
      tagEn: 'Bihar Bhumi Records',
      tagHi: 'बिहार भूमि अभिलेख विशेषज्ञ'
    }
  ];

  const handleSelectCategory = (category: ProfessionalCategory) => {
    updateFilter('category', category);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {lang === 'hi' ? 'विशेषज्ञ श्रेणियां' : 'Marketplace Categories'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 tracking-tight">
              {lang === 'hi' ? 'अपनी जरूरत के अनुसार विशेषज्ञ चुनें' : 'Browse By Professional Category'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
            {lang === 'hi'
              ? 'बिहार के रजिस्ट्री ऑफिस, अंचल कार्यालय और सिविल कोर्ट में कार्यरत सत्यापित पेशेवर।'
              : 'Every professional is licensed and physically verified at respective Bihar registry offices.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group bg-white hover:bg-gray-50/50 border border-gray-100 rounded-2xl p-6 transition-all duration-200 shadow-xl shadow-gray-200/40 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-[#0B3D91] text-[#0B3D91] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E6FFFA] text-[#10B981] border border-emerald-100">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#082B63] group-hover:text-[#0B3D91] transition-colors mb-1">
                    {lang === 'hi' ? cat.titleHi : cat.titleEn}
                  </h3>

                  <div className="text-[11px] font-semibold text-[#0B3D91] mb-3">
                    {lang === 'hi' ? cat.tagHi : cat.tagEn}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'hi' ? cat.subHi : cat.subEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0B3D91] group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'hi' ? 'विशेषज्ञ सूची देखें' : 'View Professionals'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}

          {/* Quick Calculator Card */}
          <div 
            onClick={() => {
              const evt = new CustomEvent('open-stamp-calc');
              window.dispatchEvent(evt);
            }}
            className="bg-[#082B63] text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-blue-950/20 cursor-pointer hover:bg-[#062456] transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F59E0B] mb-4">
                <Stamp className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">Free Interactive Tool</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                {lang === 'hi' ? 'बिहार स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Land Stamp Duty Calculator'}
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                {lang === 'hi'
                  ? 'पुरुष (6% + 2%), महिला (5.7% + 1.9%) व गिफ्ट डीड पर सरकारी निबंधन शुल्क का तुरंत सटीक अनुमान लगाएं।'
                  : 'Calculate accurate Bihar registry fees, female buyer concessions, and blood relation gift deed discounts.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-blue-200">
              <span>{lang === 'hi' ? 'कैलकुलेटर खोलें' : 'Calculate Fees Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
