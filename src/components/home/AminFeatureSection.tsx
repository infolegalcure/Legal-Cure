import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, CheckCircle2, ShieldCheck, ArrowRight, MapPin, Layers, Ruler } from 'lucide-react';

export const AminFeatureSection: React.FC = () => {
  const { lang, setActiveView, updateFilter } = useApp();

  const handleAminExplore = () => {
    updateFilter('category', 'Amin / Land Surveyor');
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-gray-200" id="amin-feature-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Phase 1 Active Category</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
                {lang === 'hi'
                  ? 'प्रमाणित सरकारी एवं प्राइवेट अमीन (Land Surveyors)'
                  : 'Certified Bihar Amin & Precision Land Surveyors'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Accurate land measurement using traditional Gunter Chains (कड़ी/जरीब) and modern Digital GPS Total Station equipment across Bihar’s revenue villages (मौजा).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <Ruler className="w-5 h-5 text-[#0B3D91] mb-2" />
                <h4 className="font-bold text-[#082B63]">Katha-Dhur-Decimal Conversion</h4>
                <p className="text-gray-500 mt-1 text-[11px] leading-relaxed">
                  Precise calculation according to district-specific Laggi (5.5 hands or 6 hands).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <Layers className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-[#082B63]">Cadastral Map Demarcation</h4>
                <p className="text-gray-500 mt-1 text-[11px] leading-relaxed">
                  Boundary pillar verification matching Khatiyan survey sheets and field physical features.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#082B63] to-[#0B3D91] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Field Survey Experts
                </span>
                <span className="text-xs text-blue-200 font-bold">534 Revenue Blocks</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'hi' ? 'खेत एवं प्लॉट नापी हेतु अमीन बुक करें' : 'Book a Certified Amin for Plot Survey'}
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Direct block-level matching for partition settlement, boundary disputes, and mutation field checks.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Revenue Block Specific Matching</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent On-Site Survey Report</span>
                </div>
              </div>

              <button
                onClick={handleAminExplore}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>{lang === 'hi' ? 'अपने ब्लॉक का अमीन खोजें' : 'Find Amins in Your Block'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
