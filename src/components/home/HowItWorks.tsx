import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { lang, setActiveView } = useApp();

  const steps = [
    {
      num: '01',
      icon: Search,
      titleEn: 'Search & Compare Verified Experts',
      titleHi: '1. जिला व रजिस्ट्री ऑफिस अनुसार खोजें',
      descEn: 'Filter by your specific district, block, or registry office. Review experience, fees, user ratings, and government license ID.',
      descHi: 'अपने जिले, निबंधन कार्यालय या प्रखंड के अनुसार कातिब, वकील या अमीन चुनें। अनुभव, रेटिंग और फीस की निष्पक्ष तुलना करें।'
    },
    {
      num: '02',
      icon: CreditCard,
      titleEn: 'Lock Slot with ₹100 Token',
      titleHi: '2. ₹100 टोकन देकर समय सुरक्षित करें',
      descEn: 'Pay a tiny ₹100 platform token via UPI or Card to lock an official appointment slot. The token is fully adjusted against the final consultation.',
      descHi: 'यूपीआई या कार्ड से मात्र ₹100 का टोकन देकर अपना स्लॉट पक्का करें। यह टोकन आपके अंतिम परामर्श शुल्क में पूरा घट जाएगा।'
    },
    {
      num: '03',
      icon: CheckCircle2,
      titleEn: 'Meet at Registry Office or Plot & Execute',
      titleHi: '3. ऑफिस या जमीन पर मिलें व काम पूरा कराएं',
      descEn: 'Meet the expert at their registry office shed, court chamber, or land plot. Get your deeds drafted, land measured, or title checked with zero stress.',
      descHi: 'रजिस्ट्री ऑफिस के शेड, कोर्ट चेंबर या सीधे जमीन पर मिलें। बिना किसी बिचौलिए के पारदर्शी तरीके से अपना काम पूरा कराएं।'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
            {lang === 'hi' ? 'सरल व पारदर्शी प्रक्रिया' : 'Transparent & Easy'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#082B63] mt-1 tracking-tight">
            {lang === 'hi' ? 'लीगलक्योर कैसे काम करता है?' : 'How LegalCure Works in 3 Steps'}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {lang === 'hi'
              ? 'बिना बिचौलियों के, सीधे प्रमाणित कातिब व वकीलों से जुड़ने की सुरक्षित व्यवस्था।'
              : 'Directly connect with licensed professionals at Bihar registry offices with total transparency.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-8 relative flex flex-col justify-between shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0B3D91] flex items-center justify-center font-bold text-xl shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-gray-200">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#082B63] mb-3">
                    {lang === 'hi' ? step.titleHi : step.titleEn}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'hi' ? step.descHi : step.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#0B3D91]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>{lang === 'hi' ? '100% सत्यापित प्रक्रिया' : 'Verified & Protected'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA box */}
        <div className="mt-12 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#082B63]">
              {lang === 'hi' ? 'आज ही अपनी जमीन व रजिस्ट्री का कार्य आसान बनाएं' : 'Ready to find a professional for your property work?'}
            </h4>
            <p className="text-xs text-gray-600">
              {lang === 'hi' ? 'पटना, भागलपुर, मुजफ्फरपुर सहित बिहार के सभी 38 जिलों में तुरंत बुकिंग उपलब्ध है।' : 'Instant appointment booking with ₹100 token across all 38 Bihar districts.'}
            </p>
          </div>

          <button
            onClick={() => { setActiveView('professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-[#0B3D91] hover:bg-[#082B63] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span>{lang === 'hi' ? 'सभी विशेषज्ञ देखें' : 'Browse All Professionals'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
