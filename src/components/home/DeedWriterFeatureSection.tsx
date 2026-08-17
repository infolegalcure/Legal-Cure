import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, Building, Award, Clock } from 'lucide-react';

export const DeedWriterFeatureSection: React.FC = () => {
  const { lang, setActiveView, updateFilter } = useApp();

  const handleDeedWriterExplore = () => {
    updateFilter('category', 'Deed Writer');
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white border-y border-gray-200" id="deed-writer-feature-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5 bg-[#082B63] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0B3D91] px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30">
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                <span>Phase 1 Active Category</span>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  {lang === 'hi' ? 'दस्तावेज लेखक / कातिब सेवा' : 'Licensed Deed Writer (Katib)'}
                </h3>
                <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                  {lang === 'hi'
                    ? 'बिहार निबंधन विभाग द्वारा अनुज्ञप्ति प्राप्त कातिबों से केवाला, दानपत्र, वसीयत, एवं बंटवारानामा का शुद्ध कानूनी प्रारूपण।'
                    : 'Official drafting of Sale Deeds (Kewala), Gift Deeds, Will Deeds, and Partition Deeds at Sub-Registry Office sheds.'}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bihar MVR (Minimum Valuation Rate) Circle Rate Calculation</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Chauhaddi (4-Boundary) & Title Chain Verification</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Sub-Registry Shed Presence (No Unauthorized Agents)</span>
                </div>
              </div>

              <button
                onClick={handleDeedWriterExplore}
                className="w-full bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>{lang === 'hi' ? 'कातिब खोजें (38 जिले)' : 'Find Verified Deed Writers in Bihar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">
                {lang === 'hi' ? 'दस्तावेज सुरक्षा' : 'Deed Drafting & Registry'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
                {lang === 'hi'
                  ? 'निबंधन कार्यालय में सही शेड एवं सही कातिब'
                  : 'Direct Sub-Registry Shed Booking with Zero Agent Exploitation'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                In Bihar, getting a land deed (Kewala) registered often involves confusing registry office campuses. LegalCure connects you directly to verified Deed Writers with verified license numbers and allocated registry sheds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200">
                <Building className="w-5 h-5 text-[#082B63] mb-2" />
                <h4 className="font-bold text-[#082B63]">Sub-Registry Office Specific</h4>
                <p className="text-gray-500 mt-1 text-[11px] leading-relaxed">
                  Search by your exact Sub-Registry Office (e.g. Patna Sadar, Danapur, Bikram, Barh).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-[#082B63]">₹100 Token Protection</h4>
                <p className="text-gray-500 mt-1 text-[11px] leading-relaxed">
                  Lock your consultation slot with a ₹100 token fee that is fully deducted from final drafting charges.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
