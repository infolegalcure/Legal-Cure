import React from 'react';
import { useApp } from '../../context/AppContext';
import { Professional } from '../../types';
import { CheckCircle2, Star, MapPin, Building, Briefcase, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  pro: Professional;
}

export const ProfessionalCard: React.FC<Props> = ({ pro }) => {
  const { lang, setSelectedProForProfile, setSelectedProForBooking } = useApp();

  return (
    <div 
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between hover:shadow-2xl transition-all duration-200 relative group"
      id={`pro-card-${pro.id}`}
    >
      <div>
        {/* Top pro profile info */}
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
            <img 
              src={pro.image} 
              alt={pro.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <span className="bg-[#E6FFFA] text-[#10B981] text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-tighter">
                <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                {lang === 'hi' ? 'सत्यापित विशेषज्ञ' : 'Verified Expert'}
              </span>
              <span className="text-[#F59E0B] text-xs font-bold flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ★ {pro.rating}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#082B63] mt-1 truncate">
              {lang === 'hi' && pro.nameHi ? pro.nameHi : pro.name}
            </h3>
            
            <p className="text-xs font-semibold text-[#0B3D91] truncate">
              {lang === 'hi' && pro.categoryHi ? pro.categoryHi : pro.category}
            </p>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 border-t pt-3 border-gray-50">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">{lang === 'hi' ? 'अनुभव' : 'Experience'}</span>
            <span className="font-bold text-[#082B63]">{pro.experience}+ {lang === 'hi' ? 'वर्ष' : 'Years'}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">{lang === 'hi' ? 'कार्यालय / स्थान' : 'Office Location'}</span>
            <span className="font-bold text-[#082B63] truncate max-w-[160px]">{pro.office}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">{lang === 'hi' ? 'परामर्श फीस' : 'Consultation Fee'}</span>
            <span className="font-bold text-[#082B63]">₹{pro.fee.toLocaleString('en-IN')} <span className="text-[10px] text-[#10B981] font-semibold">(₹100 Token)</span></span>
          </div>
        </div>

        {/* Services tags */}
        <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-gray-50">
          {pro.services.slice(0, 2).map((s, idx) => (
            <span 
              key={idx} 
              className="bg-blue-50 text-[#0B3D91] text-[10px] px-2 py-0.5 rounded-md font-medium"
            >
              {s}
            </span>
          ))}
          {pro.services.length > 2 && (
            <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-md font-medium">
              +{pro.services.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex gap-2">
        <button
          onClick={() => setSelectedProForProfile(pro)}
          className="flex-1 border border-[#0B3D91] text-[#0B3D91] text-xs font-bold py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 active:scale-95"
          id={`btn-profile-${pro.id}`}
        >
          <span>{lang === 'hi' ? 'प्रोफाइल' : 'Profile'}</span>
        </button>

        <button
          onClick={() => setSelectedProForBooking(pro)}
          className="flex-1 bg-[#0B3D91] text-white text-xs font-bold py-2.5 rounded-xl shadow-md hover:bg-[#082B63] transition-colors flex items-center justify-center gap-1 active:scale-95"
          id={`btn-book-${pro.id}`}
        >
          <span>{lang === 'hi' ? 'बुकिंग (₹100)' : 'Book Slot'}</span>
        </button>
      </div>
    </div>
  );
};
