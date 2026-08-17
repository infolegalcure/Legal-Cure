import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  CalendarCheck, 
  ShieldCheck, 
  MessageSquare, 
  IndianRupee, 
  FileText, 
  Compass, 
  Building, 
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { lang, setActiveView, updateFilter, setIsStampCalcOpen } = useApp();

  const steps = [
    {
      num: '01',
      titleEn: 'Select Professional Type (Phase 1: Deed Writer or Amin)',
      titleHi: '1. पेशेवर श्रेणी चुनें (फेज 1: कातिब अथवा अमीन)',
      descEn: 'Choose Deed Writer (Katib) for sale deed drafting, MVR valuation, and registry token booking; or Amin / Land Surveyor for plot measurement and boundary demarcation.',
      descHi: 'जमीन रजिस्ट्री/केवाला के लिए कातिब (Deed Writer) या खेत/प्लॉट की भौतिक पैमाइश के लिए अमीन चुनें।'
    },
    {
      num: '02',
      titleEn: 'Filter by District & Conditional Zone (Office / Block)',
      titleHi: '2. जिला एवं संबंधित कार्यालय/प्रखंड चुनें',
      descEn: 'Select your Bihar district (e.g. Patna, Muzaffarpur, Bhagalpur). For Deed Writers, select the Sub-Registry Office; for Amins, select the Revenue Block.',
      descHi: 'अपने जिले का चयन करें। कातिब के लिए निबंधन कार्यालय (Sub-Registry Office) और अमीन के लिए अंचल (Block) चुनें।'
    },
    {
      num: '03',
      titleEn: 'Review Profile & Book with ₹100 Protected Token',
      titleHi: '3. प्रोफाइल देखें एवं ₹100 सुरक्षित टोकन से बुक करें',
      descEn: 'Inspect verified license numbers, experience, shed locations, and client ratings. Submit your preferred date and plot Khata/Khesra details.',
      descHi: 'लाइसेंस नंबर, शेड पता, और रेटिंग देखकर अपना पसंदीदा दिन व खाता/खेसरा विवरण दर्ज कर ₹100 टोकन से बुकिंग अनुरोध भेजें।'
    },
    {
      num: '04',
      titleEn: 'WhatsApp Intimation & Professional Confirmation',
      titleHi: '4. व्हाट्सएप सूचना एवं पेशेवर द्वारा पुष्टि',
      descEn: 'Submitting a request places it in review. The professional reviews their schedule and confirms or suggests an alternative slot. Both receive instant WhatsApp confirmations.',
      descHi: 'पेशेवर को तुरंत व्हाट्सएप सूचना जाती है। उनके द्वारा स्वीकार करने पर दोनों पक्षों को शेड पते और समय के साथ आधिकारिक पुष्टि प्राप्त होती है।'
    },
    {
      num: '05',
      titleEn: 'Office / Field Meeting & Token Fee Adjustment',
      titleHi: '5. कार्यालय/फील्ड में मुलाकात एवं बिल समायोजन',
      descEn: 'Meet directly at the verified Sub-Registry shed or survey site. The ₹100 token fee is 100% deducted from your final consultation bill with zero middlemen commissions.',
      descHi: 'रजिस्ट्री शेड या जमीन पर सीधे मिलें। आपका ₹100 टोकन अंतिम बिल में पूरा घट जाता है। कोई बिचौलिया या कमीशन नहीं।'
    }
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Breadcrumb / Title */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#082B63] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-100 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>{lang === 'hi' ? 'पारदर्शी व सुरक्षित प्रक्रिया' : 'Transparent & Secure Process'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B63] tracking-tight">
          {lang === 'hi' ? 'लीगलक्योर कैसे काम करता है?' : 'How LegalCure.in Works'}
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {lang === 'hi'
            ? 'बिहार के 38 जिलों में जमीन रजिस्ट्री (केवाला) और सरकारी अमीन से जमीन नापी की सरल और पारदर्शी मार्गदर्शिका।'
            : 'A step-by-step guide to finding verified Deed Writers (Katib) and certified Amins across all 38 districts of Bihar.'}
        </p>
      </div>

      {/* 5 Process Steps */}
      <div className="space-y-6">
        {steps.map((st, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#082B63] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              {st.num}
            </div>

            <div className="flex-1 space-y-1.5">
              <h2 className="text-lg font-bold text-[#082B63]">
                {lang === 'hi' ? st.titleHi : st.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {lang === 'hi' ? st.descHi : st.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Token Protection Guarantee Box */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#082B63] text-white flex items-center justify-center font-bold text-sm">
              ₹
            </span>
            <h3 className="text-base font-bold text-[#082B63]">
              {lang === 'hi' ? '100% टोकन सुरक्षा नीति' : '100% Token Protection Guarantee'}
            </h3>
          </div>
          <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
            {lang === 'hi'
              ? 'यदि पेशेवर आपके अनुरोध को अस्वीकार करते हैं या समय पर उपस्थित नहीं होते, तो ₹100 टोकन तुरंत आपके खाते में रिफंड कर दिया जाता है।'
              : 'If a professional rejects a booking or is unavailable, your ₹100 token is immediately refunded. Zero hidden fees or cancellation charges.'}
          </p>
        </div>

        <button
          onClick={() => {
            setActiveView('professionals');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#082B63] hover:bg-[#0B3D91] text-white px-6 py-3.5 rounded-full text-xs font-bold shadow-md transition-all whitespace-nowrap flex items-center gap-2"
        >
          <span>{lang === 'hi' ? 'विशेषज्ञ खोजें' : 'Start Searching Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
