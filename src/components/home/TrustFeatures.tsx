import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck2, Coins, MapPinned, Award, HeartHandshake } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const { lang } = useApp();

  const features = [
    {
      icon: ShieldCheck,
      titleEn: 'Physical Registry License Verification',
      titleHi: 'लाइसेंस व बार काउंसिल सत्यापन',
      descEn: 'Every Katib, Lawyer, and Amin is physically verified with their official Bihar Registration Dept or Bar Council license number.',
      descHi: 'प्रत्येक कातिब, वकील व अमीन का बिहार सरकार निबंधन विभाग या बार काउंसिल लाइसेंस नंबर भौतिक रूप से सत्यापित है।'
    },
    {
      icon: Coins,
      titleEn: '₹100 Token Protection Guarantee',
      titleHi: '₹100 टोकन सुरक्षा गारंटी',
      descEn: 'No large advance payments to strangers. Pay only ₹100 token on the portal, which is deducted from your final office consultation bill.',
      descHi: 'कोई बड़ा एडवांस नहीं। मात्र ₹100 टोकन जमा करें, जो आपके अंतिम परामर्श बिल में पूरा घटा दिया जाता है।'
    },
    {
      icon: MapPinned,
      titleEn: 'Exact Registry Shed & Chamber Address',
      titleHi: 'रजिस्ट्री शेड व चेंबर का सटीक पता',
      descEn: 'Get exact shed numbers, court chamber addresses, and direct phone/WhatsApp details to meet in person without wandering.',
      descHi: 'रजिस्ट्री ऑफिस शेड नंबर, कोर्ट चेंबर पता व सीधा फोन नंबर प्राप्त करें ताकि आपको भटकना न पड़े।'
    },
    {
      icon: UserCheck2,
      titleEn: 'Zero Middlemen & Transparent Fees',
      titleHi: 'बिचौलिया मुक्त व पारदर्शी फीस',
      descEn: 'Eliminate unauthorized middlemen who inflate stamp duty and circle rates. Deal directly with certified experts.',
      descHi: 'रजिस्ट्री ऑफिस के बाहर अनधिकृत बिचौलियों के चंगुल से बचें और सीधे विशेषज्ञ से तय फीस पर काम कराएं।'
    },
    {
      icon: Award,
      titleEn: 'Circle Rate & MVR Accuracy',
      titleHi: 'सरकारी एमवीआर व सर्किल रेट गणना',
      descEn: 'Our verified Deed Writers ensure accurate Minimum Valuation Rate (MVR) calculation to avoid government penalty notices.',
      descHi: 'सरकारी एमवीआर और सर्किल रेट की सटीक गणना ताकि भविष्य में स्टांप कमी की कोई कानूनी नोटिस न आए।'
    },
    {
      icon: HeartHandshake,
      titleEn: 'Bilingual Support (English & हिंदी)',
      titleHi: 'पूरी तरह हिंदी व अंग्रेजी में उपलब्ध',
      descEn: 'Seamlessly switch between Hindi and English with authentic Bihar revenue terminology (Kewala, Jamabandi, Khesra, Khata).',
      descHi: 'खतियान, जमाबंदी, खेसरा, केवाला जैसे बिहार के सभी राजस्व शब्दों के साथ आसान हिंदी इंटरफेस।'
    }
  ];

  return (
    <section className="py-16 bg-[#F6F8FC] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
            {lang === 'hi' ? 'भरोसा और सुरक्षा' : 'Trust & Reliability'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#082B63] mt-1 tracking-tight">
            {lang === 'hi' ? 'बिहार के लोग लीगलक्योर पर भरोसा क्यों करते हैं?' : 'Why Bihar Trusts LegalCure.in'}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {lang === 'hi'
              ? 'जमीन और रजिस्ट्री जैसे संवेदनशील मामलों में 100% सुरक्षा, पारदर्शिता और सुविधा।'
              : 'Safe, verified, and transparent ecosystem for all your land registry and litigation needs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/40 hover:border-blue-200 hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#082B63] mb-2">
                  {lang === 'hi' ? feat.titleHi : feat.titleEn}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lang === 'hi' ? feat.descHi : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
