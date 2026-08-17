import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Compass, Scale, Stamp, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { ProfessionalCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { lang, updateFilter, setActiveView } = useApp();

  const handleSelectCategory = (category: ProfessionalCategory, isPhase1Active: boolean) => {
    if (!isPhase1Active) return;
    updateFilter('category', category);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#F6F8FC] border-b border-gray-100" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-[#082B63] text-xs font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Phase 1 Active Services
              </span>
              <span className="text-xs text-gray-500 font-medium">
                100% Verified Bihar Land Specialists
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
              {lang === 'hi'
                ? 'विशेषज्ञ भूमि सेवाएं: कातिब एवं अमीन'
                : 'Specialized Bihar Land Services'}
            </h2>
            <p className="text-gray-600 text-sm mt-1 max-w-2xl">
              {lang === 'hi'
                ? 'जमीन रजिस्ट्री (केवाला) और खेत/प्लॉट की सटीक पैमाइश (नापी) के लिए राज्य के सभी 38 जिलों में लाइसेंस प्राप्त प्रोफेशनल्स से जुड़ें।'
                : 'Connect with verified Deed Writers for registry drafting and government-certified Amins for land measurement in all 38 Bihar districts.'}
            </p>
          </div>

          <button
            onClick={() => {
              updateFilter('category', 'All');
              setActiveView('professionals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#0B3D91] hover:text-[#082B63] flex items-center gap-1 group self-start md:self-auto bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs"
          >
            <span>{lang === 'hi' ? 'सभी उपलब्ध विशेषज्ञ देखें' : 'Browse All Active Pros'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2 Active Phase 1 Hero Cards + 2 Phase 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Active 1: Deed Writer */}
          <div 
            onClick={() => handleSelectCategory('Deed Writer', true)}
            className="bg-white rounded-2xl p-7 border-2 border-blue-200/80 shadow-md hover:shadow-xl hover:border-[#0B3D91] transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            id="card-deed-writer"
          >
            <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Phase 1 Active</span>
            </div>

            <div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#082B63] mb-5 group-hover:scale-105 transition-transform border border-blue-100">
                <FileText className="w-7 h-7 text-[#0B3D91]" />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Sub-Registry Office
                </span>
                <span className="text-xs text-gray-500 font-semibold">135+ Offices in Bihar</span>
              </div>

              <h3 className="text-xl font-black text-[#082B63] mt-2 group-hover:text-[#0B3D91] transition-colors">
                {lang === 'hi' ? 'दस्तावेज लेखक (कातिब / Katib)' : 'Deed Writer (Katib)'}
              </h3>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {lang === 'hi'
                  ? 'केवाला (Sale Deed), दान पत्र (Hibanama), बंटवारानामा (Partition Deed) का सटीक मसौदा, MVR सर्किल रेट गणना और सब-रजिस्ट्री ऑफिस टोकन फाइलिंग।'
                  : 'Specialists in error-free Sale Deed (Kewala), Gift Deed (Hibanama), Batwarinama drafting, circle rate valuation, and sub-registry office token booking.'}
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Sale Deed (केवाला)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Gift Deed (हिबानामा)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Batwarinama (बंटवारा)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Chauhaddi Verification</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-[#0B3D91] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Verified License Holders</span>
              </span>
              <span className="bg-[#082B63] group-hover:bg-[#0B3D91] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-1">
                <span>{lang === 'hi' ? 'कातिब खोजें' : 'Find Deed Writers'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Active 2: Amin / Land Surveyor */}
          <div 
            onClick={() => handleSelectCategory('Amin / Land Surveyor', true)}
            className="bg-white rounded-2xl p-7 border-2 border-blue-200/80 shadow-md hover:shadow-xl hover:border-[#0B3D91] transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            id="card-amin-surveyor"
          >
            <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Phase 1 Active</span>
            </div>

            <div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-105 transition-transform border border-emerald-100">
                <Compass className="w-7 h-7 text-emerald-700" />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Revenue Block Level
                </span>
                <span className="text-xs text-gray-500 font-semibold">534 Blocks in Bihar</span>
              </div>

              <h3 className="text-xl font-black text-[#082B63] mt-2 group-hover:text-[#0B3D91] transition-colors">
                {lang === 'hi' ? 'अमीन / भूमि सर्वेयर (Amin Surveyor)' : 'Amin / Land Surveyor'}
              </h3>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {lang === 'hi'
                  ? 'कट्ठा, धूर और डिसमिल में जमीन की सटीक भौतिक नापी। कैडस्ट्रल/रिविजनल नक्शा मिलान, सीमा पिलर स्थापन (हदबंदी) और बंटवारा पंचनामा।'
                  : 'Expert land measurement in Katha, Dhur & Decimal units. Gunter Chain, Total Station & GPS survey, Cadastral map matching, and boundary pillar demarcation.'}
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Katha/Dhur/Decimal Naapi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Boundary Demarcation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Cadastral Map Matching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Plot Sub-Division Survey</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-[#0B3D91] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Certified Revenue Amins</span>
              </span>
              <span className="bg-[#082B63] group-hover:bg-[#0B3D91] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-1">
                <span>{lang === 'hi' ? 'अमीन खोजें' : 'Find Amins'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

        {/* Phase 2 Architecture Roadmap Preview (Clearly deactivated) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Phase 2 Expansion Roadmap (Architecture Ready)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">
                    {lang === 'hi' ? 'जमीन व राजस्व अधिवक्ता (Lawyer)' : 'Property Lawyers & Advocates'}
                  </div>
                  <div className="text-xs text-gray-500">30-Year Title Search, DCLR disputes & Civil suits</div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full whitespace-nowrap">
                Coming in Phase 2
              </span>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/70 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">
                    {lang === 'hi' ? 'नोटरी पब्लिक (Notary Public)' : 'Notary Public & Attestation'}
                  </div>
                  <div className="text-xs text-gray-500">Affidavits, GPA/SPA and contract attestations</div>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full whitespace-nowrap">
                Coming in Phase 2
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
