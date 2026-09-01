import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Smartphone, 
  CheckCircle2, 
  FileText, 
  Compass, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ForProfessionalsView: React.FC = () => {
  const { lang, openAuthModal, setActiveView } = useApp();

  const handleRegisterClick = () => {
    setActiveView('pro_register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const benefits = [
    {
      titleEn: 'Direct Client Inquiries & Bookings',
      titleHi: 'सीधे ग्राहकों से बुकिंग और कॉल',
      descEn: 'Get connected with genuine land buyers, sellers, and property owners looking for deed drafting and land measurement in your specific sub-registry office or revenue block.',
      descHi: 'अपने निबंधन कार्यालय या अंचल के वास्तविक जमीन खरीदारों और स्वामियों से सीधा संपर्क प्राप्त करें।'
    },
    {
      titleEn: 'WhatsApp-First Booking Management',
      titleHi: 'व्हाट्सएप पर 1-क्लिक बुकिंग प्रबंधन',
      descEn: 'Receive incoming client booking alerts with plot Khata/Khesra notes directly on WhatsApp. Accept, suggest an alternative time, or reject with a single tap.',
      descHi: 'व्हाट्सएप पर ग्राहक का खाता/खेसरा विवरण प्राप्त करें और 1-क्लिक में स्वीकार या नया समय प्रस्तावित करें।'
    },
    {
      titleEn: 'Zero Commission Model',
      titleHi: 'शून्य कमीशन नीति (100% आपकी कमाई)',
      descEn: 'LegalCure does not cut hefty commissions from your drafting or survey fees. You collect your professional charges directly at your office shed.',
      descHi: 'लीगलक्योर आपकी पेशेवर फीस में से कोई भारी कमीशन नहीं लेता। आप अपनी तय फीस सीधे अपने चेंबर पर प्राप्त करते हैं।'
    },
    {
      titleEn: 'Verified Government License Badge',
      titleHi: 'सत्यापित सरकारी लाइसेंस बैज',
      descEn: 'Showcase your official Registration Department license or Revenue Amin certificate. Build digital credibility and stand out from unauthorized middlemen.',
      descHi: 'अपना निबंधन विभाग लाइसेंस या अमीन प्रमाण पत्र प्रदर्शित करें और अपनी डिजिटल पहचान व प्रतिष्ठा मजबूत करें।'
    }
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Hero */}
      <div className="bg-[#082B63] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? 'कातिब एवं अमीन पेशेवर नेटवर्क' : 'Deed Writer & Amin Professional Network'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'hi'
              ? 'बिहार के अग्रणी कातिब एवं अमीन समुदाय से जुड़ें'
              : 'Join Bihar’s Dedicated Network of Verified Land Professionals'}
          </h1>

          <p className="text-blue-200/90 text-sm leading-relaxed">
            {lang === 'hi'
              ? 'अपने निबंधन कार्यालय या अंचल में अपनी डिजिटल उपस्थिति बनाएं, सीधे क्लाइंट्स पाएं और समय का बेहतर प्रबंधन करें।'
              : 'Grow your practice across 38 Bihar districts. Receive high-intent local client bookings directly on WhatsApp with zero middleman interference.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleRegisterClick}
              className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md flex items-center gap-2"
            >
              <span>{lang === 'hi' ? 'पेशेवर के रूप में पंजीकरण करें' : 'Register as Professional'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal('login')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-full text-xs transition-all border border-white/20"
            >
              {lang === 'hi' ? 'मौजूदा प्रो लॉगिन' : 'Existing Pro Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-[#082B63]">
            {lang === 'hi' ? 'लीगलक्योर पर शामिल होने के फायदे' : 'Why Deed Writers & Amins Choose LegalCure'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Built specifically for Bihar’s registry sheds and revenue block operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-[#0B3D91] transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#082B63] flex items-center justify-center font-bold mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-[#082B63] mb-2">
                {lang === 'hi' ? b.titleHi : b.titleEn}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lang === 'hi' ? b.descHi : b.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Checklist */}
      <div className="bg-[#F6F8FC] rounded-3xl p-6 sm:p-8 border border-gray-200">
        <h3 className="text-lg font-bold text-[#082B63] mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#10B981]" />
          <span>{lang === 'hi' ? 'पंजीकरण हेतु आवश्यक दस्तावेज' : 'Onboarding Requirements'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-700">
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <div className="font-bold text-[#082B63]">1. License / Certificate</div>
            <p className="text-gray-500 text-[11px]">Deed Writer License number or Govt Amin diploma certificate.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <div className="font-bold text-[#082B63]">2. Office / Shed Location</div>
            <p className="text-gray-500 text-[11px]">Sub-Registry shed number or Block chamber address.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <div className="font-bold text-[#082B63]">3. WhatsApp Mobile</div>
            <p className="text-gray-500 text-[11px]">Active WhatsApp number for receiving real-time booking alerts.</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleRegisterClick}
            className="bg-[#082B63] hover:bg-[#0B3D91] text-white px-8 py-3 rounded-full text-xs font-bold shadow-md transition-all"
          >
            {lang === 'hi' ? 'अभी आवेदन करें (Free Onboarding)' : 'Apply for Free Verification'}
          </button>
        </div>
      </div>

    </div>
  );
};
