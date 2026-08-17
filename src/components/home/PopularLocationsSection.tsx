import React from 'react';
import { useApp } from '../../context/AppContext';
import { BIHAR_DISTRICTS } from '../../constants/biharData';
import { MapPin, Building, ArrowRight } from 'lucide-react';

export const PopularLocationsSection: React.FC = () => {
  const { lang, updateFilter, setActiveView } = useApp();

  const handleSelectDistrict = (districtName: string) => {
    updateFilter('district', districtName);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredDistricts = [
    { name: 'Patna', nameHi: 'पटना', sheds: '12 Sub-Registries (Sadar, Danapur, Bikram, Barh)' },
    { name: 'Bhagalpur', nameHi: 'भागलपुर', sheds: '5 Sub-Registries (Sadar, Kahalgaon, Bihpur)' },
    { name: 'Muzaffarpur', nameHi: 'मुजफ्फरपुर', sheds: '6 Sub-Registries (Sadar, Katra, Paroo)' },
    { name: 'Gaya', nameHi: 'गया', sheds: '7 Sub-Registries (Sadar, Sherghati, Tekari)' },
    { name: 'Darbhanga', nameHi: 'दरभंगा', sheds: '5 Sub-Registries (Sadar, Benipur, Baheri)' },
    { name: 'Purnia', nameHi: 'पूर्णिया', sheds: '4 Sub-Registries (Sadar, Banmankhi, Dhamdaha)' },
    { name: 'Begusarai', nameHi: 'बेगूसराय', sheds: '5 Sub-Registries (Sadar, Manjhaul, Bakhri)' },
    { name: 'Nalanda', nameHi: 'नालंदा (बिहारशरीफ)', sheds: '4 Sub-Registries (Bihar Sharif, Hilsa, Rajgir)' }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-200" id="bihar-locations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">
              {lang === 'hi' ? '38 जिलों का नेटवर्क' : 'Hyper-Local Bihar Coverage'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
              {lang === 'hi' ? 'प्रमुख निबंधन कार्यालय व अंचल' : 'Top Sub-Registry Offices & Revenue Blocks'}
            </h2>
          </div>

          <button
            onClick={() => {
              updateFilter('district', 'ALL');
              setActiveView('professionals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#082B63] hover:text-[#0B3D91] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>{lang === 'hi' ? 'सभी 38 जिले देखें' : 'View all 38 Bihar districts'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredDistricts.map((d, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectDistrict(d.name)}
              className="bg-slate-50 hover:bg-blue-50/60 p-4 rounded-2xl border border-gray-200 hover:border-[#0B3D91] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm text-[#082B63]">
                  {lang === 'hi' ? d.nameHi : d.name}
                </h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {d.sheds}
              </p>
              <div className="mt-3 text-[10px] font-bold text-[#0B3D91] flex items-center gap-1">
                <span>View Katibs & Amins</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
