import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Send, 
  ExternalLink 
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { lang, setIsWhatsAppDrawerOpen, showToast } = useApp();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDistrict, setTicketDistrict] = useState('Patna');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) {
      showToast('Please complete the subject and details', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Support ticket #LC-' + Math.floor(100000 + Math.random() * 900000) + ' created successfully!', 'success');
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-[#082B63] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? '24x7 ग्राहक एवं पेशेवर सहायता केंद्र' : 'LegalCure Bihar Support & Help Center'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'hi'
              ? 'बिहार भूमि सेवा सहायता एवं शिकायत निवारण'
              : 'How can our Bihar Land Support Team help you?'}
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'कातिब बुकिंग, अमीन पैमाइश शेड्यूलिंग, टोकन शुल्क सुरक्षा अथवा निबंधन संबंधी किसी भी प्रश्न के लिए हमारी पटना टीम से संपर्क करें।'
              : 'Get immediate guidance for Deed Writer bookings, Amin measurement appointments, ₹100 Token Protection Guarantee, or sub-registry visit queries.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsWhatsAppDrawerOpen(true)}
              className="bg-[#10B981] text-slate-900 hover:bg-emerald-400 font-bold px-6 py-3 rounded-full text-xs transition-all shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर सहायता लें' : 'Chat on WhatsApp Support'}</span>
            </button>
            <a
              href="tel:+916122294100"
              className="border border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-full text-xs transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Helpline: +91 612 2294 100</span>
            </a>
          </div>
        </div>
      </div>

      {/* Support Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#082B63] flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'hi' ? 'फोन हेल्पलाइन' : 'Direct Helpline'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'सोमवार से शनिवार (सुबह 9:00 बजे से शाम 7:00 बजे तक)'
              : 'Monday to Saturday (9:00 AM – 7:00 PM IST) for all Bihar districts.'}
          </p>
          <div className="text-xs font-bold text-[#082B63]">
            +91 612 2294 100 / +91 94312 00000
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'hi' ? 'व्हाट्सएप डेस्क' : 'WhatsApp Desk'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'त्वरित टोकन पुष्टि, बुकिंग पुनर्निर्धारण और रसीद सहायता।'
              : 'Instant booking rescheduling, token refund assistance, and document status.'}
          </p>
          <button
            onClick={() => setIsWhatsAppDrawerOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Open WhatsApp Desk</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'hi' ? 'मुख्य कार्यालय' : 'Patna Central Hub'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            LegalCure Bihar Support Center, Exhibition Road / Fraser Road, Patna, Bihar 800001
          </p>
          <div className="text-xs font-bold text-purple-700">
            support@legalcure.in
          </div>
        </div>
      </div>

      {/* Ticket Form */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {lang === 'hi' ? 'सहायता अनुरोध फॉर्म (सपोर्ट टिकट)' : 'Submit a Support Inquiry'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {lang === 'hi'
            ? 'हमारे लीगल सपोर्ट प्रतिनिधि 2 कार्य घंटों के भीतर आपसे संपर्क करेंगे।'
            : 'Our dedicated support representative will contact you within 2 business hours.'}
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900 text-sm">
              {lang === 'hi' ? 'आपका अनुरोध सफलतापूर्वक दर्ज कर लिया गया है' : 'Ticket Submitted Successfully'}
            </h4>
            <p className="text-xs text-emerald-700">
              Our Bihar support coordinator will call or WhatsApp you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 text-xs font-bold text-emerald-800 underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'hi' ? 'विषय / समस्या का प्रकार' : 'Inquiry Subject'}
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Need help with Deed Writer appointment"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#082B63]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'hi' ? 'संबंधित जिला' : 'District in Bihar'}
                </label>
                <select
                  value={ticketDistrict}
                  onChange={(e) => setTicketDistrict(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#082B63] bg-white"
                >
                  <option value="Patna">Patna (पटना)</option>
                  <option value="Gaya">Gaya (गया)</option>
                  <option value="Muzaffarpur">Muzaffarpur (मुजफ्फरपुर)</option>
                  <option value="Bhagalpur">Bhagalpur (भागलपुर)</option>
                  <option value="Darbhanga">Darbhanga (दरभंगा)</option>
                  <option value="Purnia">Purnia (पूर्णिया)</option>
                  <option value="Rohtas">Rohtas (सासाराम)</option>
                  <option value="Other">Other District (अन्य जिला)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'विस्तार से बताएं' : 'Message / Details'}
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your land service question or booking reference number..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#082B63]"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#082B63] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#0B3D91] transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'टिकट भेजें' : 'Send Inquiry'}</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
