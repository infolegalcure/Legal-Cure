import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Compass, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { ProfessionalCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { lang, updateFilter, setActiveView, setIsHelpMeChooseOpen } = useApp();

  const phase1Categories: {
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
      subEn: 'Drafting Sale Deeds (Kewala), Gift Deeds (Hibanama), Batwarinama, and verified token filing at Sub-Registry Offices.',
      subHi: 'केवाला (बिक्री पत्र), दान पत्र (हिबानामा), बंटवारानामा, और सब-रजिस्ट्री कार्यालय में वैध दस्तावेज निष्पादन।',
      icon: FileText,
      count: '850+ Verified',
      tagEn: 'Sub-Registry Office Specialist',
      tagHi: 'उप-निबंधन कार्यालय विशेषज्ञ'
    },
    {
      id: 'Amin / Land Surveyor',
      titleEn: 'Amin / Land Surveyor (भूमि सर्वेयर)',
      titleHi: 'सरकारी प्रशिक्षित अमीन (Amin Surveyor)',
      subEn: 'Accurate field measurement in Katha, Dhur & Decimal. Boundary demarcation (Hadbandi) & Cadastral map matching.',
      subHi: 'कट्ठा, धूर और डिसमिल में सटीक नापी, हदबंदी सीमा पिलर स्थापन और राजस्व नक्शा (कैडस्ट्रल शीट) मिलान।',
      icon: Compass,
      count: '740+ Verified',
      tagEn: 'ETS & Chain Revenue Survey',
      tagHi: 'इलेक्ट्रॉनिक व जरीब पैमाइश'
    }
  ];

  const handleSelectCategory = (category: ProfessionalCategory) => {
    updateFilter('category', category);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200" id="phase1-categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
                {lang === 'hi' ? 'फेज 1 सक्रिय सेवाएं' : 'Phase 1 Active Services'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                100% License Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
              {lang === 'hi' ? 'दस्तावेज लेखक (कातिब) एवं सरकारी अमीन' : 'Bihar Deed Writers & Amin Land Surveyors'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 md:mt-0 leading-relaxed">
            {lang === 'hi'
              ? 'बिहार के 38 जिलों के 135+ निबंधन कार्यालयों व 534 अंचलों में भौतिक रूप से सत्यापित विशेषज्ञ।'
              : 'Direct connection with licensed professionals across all 38 Bihar districts and sub-registry offices.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phase1Categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200 hover:border-[#0B3D91] rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/80 group-hover:bg-[#082B63] text-[#082B63] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#082B63] group-hover:text-[#0B3D91] transition-colors mb-1">
                    {lang === 'hi' ? cat.titleHi : cat.titleEn}
                  </h3>

                  <div className="text-xs font-semibold text-[#0B3D91] mb-2.5">
                    {lang === 'hi' ? cat.tagHi : cat.tagEn}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'hi' ? cat.subHi : cat.subEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0B3D91] group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'hi' ? 'सत्यापित विशेषज्ञ खोजें' : 'Find Professionals'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}

          {/* Help Me Choose & Protected Booking Guide Card */}
          <div 
            onClick={() => setIsHelpMeChooseOpen(true)}
            className="bg-[#082B63] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-blue-950/20 cursor-pointer hover:bg-[#062456] transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                {lang === 'hi' ? '20 सेकंड गाइड' : 'Decision Guide'}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                {lang === 'hi' ? 'कातिब अथवा अमीन: किसे चुनें?' : 'Need Help Choosing Deed Writer or Amin?'}
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                {lang === 'hi'
                  ? 'जमीन रजिस्ट्री, केवाला, हिबानामा, या जमीन नापी के लिए सही विशेषज्ञ चुनने में सहायता प्राप्त करें।'
                  : 'Answer 2 quick questions to instantly match with the right verified professional for your specific land task.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-blue-200">
              <span>{lang === 'hi' ? 'गाइड शुरू करें' : 'Start Guide'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
