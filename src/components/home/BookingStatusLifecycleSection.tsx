import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const BookingStatusLifecycleSection: React.FC = () => {
  const { lang, setActiveView } = useApp();

  const lifecycleStages = [
    {
      num: '01',
      titleEn: '1. Request Booking (₹100 Token)',
      titleHi: '1. बुकिंग अनुरोध (₹100 टोकन)',
      statusBadge: 'PENDING_PROFESSIONAL',
      descEn: 'Customer chooses a professional, selects date/time slot, enters plot Khata/Khesra, and pays a ₹100 token fee held in escrow.',
      descHi: 'ग्राहक सेवा, तिथि, समय स्लॉट व खाता/खेसरा विवरण चुनकर ₹100 टोकन शुल्क के साथ अनुरोध भेजता है।'
    },
    {
      num: '02',
      titleEn: '2. WhatsApp Alert & Pro Review',
      titleHi: '2. व्हाट्सएप सूचना व प्रो समीक्षा',
      statusBadge: 'TIME_CHANGE_REQUESTED / ACCEPT',
      descEn: 'Professional receives instant WhatsApp alert. They can 1-Click Accept, Propose an Alternative Slot, or Reject if occupied.',
      descHi: 'कातिब/अमीन को व्हाट्सएप पर अलर्ट जाता है। वे समय स्वीकार कर सकते हैं या नया समय प्रस्तावित कर सकते हैं।'
    },
    {
      num: '03',
      titleEn: '3. Client Confirmation',
      titleHi: '3. ग्राहक सहमति एवं शेड विवरण',
      statusBadge: 'CONFIRMED',
      descEn: 'Once accepted or alternative slot confirmed, full Sub-Registry shed location and direct contact is issued to both parties.',
      descHi: 'समय तय होते ही दोनों पक्षों को आधिकारिक शेड पता एवं व्हाट्सएप संपर्क विवरण प्राप्त हो जाता है।'
    },
    {
      num: '04',
      titleEn: '4. Office Meeting & ₹100 Token Deduction',
      titleHi: '4. कार्यालय में बैठक व ₹100 समायोजन',
      statusBadge: 'COMPLETED',
      descEn: 'Meet directly at the Sub-Registry shed or survey field. The ₹100 token is 100% subtracted from the consultation bill.',
      descHi: 'रजिस्ट्री शेड पर सीधे मिलें। आपका ₹100 टोकन कुल बिल में से स्वतः घटा दिया जाता है।'
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-gray-200" id="booking-lifecycle-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#082B63] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-100 mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{lang === 'hi' ? 'बुकिंग स्थिति चक्र' : 'Booking Lifecycle & State Machine'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
            {lang === 'hi'
              ? 'पारदर्शी बुकिंग प्रक्रिया — कोई झूठे वादे नहीं'
              : 'Submitting a Request Is Step 1 — Real Professional Confirmation'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Unlike generic aggregators, LegalCure respects Deed Writers’ and Amins’ registry token schedules. Every booking is actively confirmed or adjusted with instant WhatsApp notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {lifecycleStages.map((st, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 rounded-2xl p-5 border border-gray-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-[#082B63] text-white flex items-center justify-center font-black text-xs">
                    {st.num}
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-blue-100 text-[#082B63] px-2 py-0.5 rounded">
                    {st.statusBadge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#082B63] mb-1.5">
                  {lang === 'hi' ? st.titleHi : st.titleEn}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'hi' ? st.descHi : st.descEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Escrow Protected</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
