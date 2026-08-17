import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { lang } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'Why are only Deed Writers and Amins active in Phase 1?',
      qHi: 'फेज 1 में केवल कातिब (Deed Writer) एवं अमीन ही क्यों सक्रिय हैं?',
      aEn: 'Phase 1 specifically addresses Bihar’s most urgent land registration hurdles: verified Kewala deed drafting at Sub-Registry sheds and precision plot measurement. Lawyers, Notaries, and document checkers will be activated in Phase 2.',
      aHi: 'फेज 1 में बिहार के जमीन खरीदारों की सबसे प्राथमिक जरूरत — रजिस्ट्री ऑफिस में कातिब से शुद्ध केवाला बनवाना और अमीन से नापी कराना — पर पूरा ध्यान केंद्रित किया गया है। वकील व नोटरी फेज 2 में जोड़े जाएंगे।'
    },
    {
      qEn: 'How does the ₹100 token payment work?',
      qHi: '₹100 टोकन शुल्क कैसे काम करता है?',
      aEn: 'The ₹100 token confirms your appointment and locks the professional’s calendar. When you meet at the registry shed or survey site, this ₹100 is 100% deducted from the final fee.',
      aHi: '₹100 टोकन देकर आपका स्लॉट आरक्षित हो जाता है। जब आप रजिस्ट्री शेड पर मिलते हैं, तो यह ₹100 आपके कुल बिल में से पूरा घटा दिया जाता है।'
    },
    {
      qEn: 'What happens if a professional is unavailable or rejects the slot?',
      qHi: 'यदि पेशेवर उपलब्ध नहीं हैं या समय अस्वीकार करते हैं तो क्या होगा?',
      aEn: 'If a professional rejects your request or you decline their proposed alternative time, your ₹100 token is immediately refunded to your original payment method with zero deductions.',
      aHi: 'यदि पेशेवर समय अस्वीकार करते हैं या आप उनका नया समय स्वीकार नहीं करते, तो आपका ₹100 तुरंत आपके बैंक/UPI खाते में वापस रिफंड हो जाता है।'
    },
    {
      qEn: 'How is physical shed verification conducted for Katibs?',
      qHi: 'कातिबों के शेड नंबर और लाइसेंस का सत्यापन कैसे होता है?',
      aEn: 'Our admin compliance team checks the official Bihar Registration Department license number and physically verifies the allocated shed number within the Sub-Registry Office compound.',
      aHi: 'हमारी अनुपालन टीम निबंधन विभाग द्वारा जारी लाइसेंस नंबर और रजिस्ट्री परिसर में आवंटित शेड संख्या की भौतिक जांच करती है।'
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-gray-200" id="bihar-faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#082B63] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-100 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
            {lang === 'hi' ? 'सामान्य प्रश्न एवं समाधान' : 'Everything You Need to Know About LegalCure'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#082B63] hover:bg-slate-50/60 transition-colors"
                >
                  <span>{lang === 'hi' ? faq.qHi : faq.qEn}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#082B63]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in-50">
                    {lang === 'hi' ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
