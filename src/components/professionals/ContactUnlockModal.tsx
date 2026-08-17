import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Phone, MapPin, Building, CreditCard, Lock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Professional } from '../../types';

interface Props {
  pro: Professional | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactUnlockModal: React.FC<Props> = ({ pro, isOpen, onClose }) => {
  const { unlockProfessionalContact, contactUnlocks, lang } = useApp();
  const [userName, setUserName] = useState('Vivek Ranjan');
  const [userPhone, setUserPhone] = useState('+91 94312 88410');
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedDetails, setUnlockedDetails] = useState<{ phone: string; office: string } | null>(null);

  if (!isOpen || !pro) return null;

  const isAlreadyUnlocked = contactUnlocks.some(u => u.professionalId === pro.id);

  const handleUnlock = async () => {
    setIsProcessing(true);
    try {
      const result = await unlockProfessionalContact(pro.id, userName, userPhone);
      setUnlockedDetails({
        phone: result.professionalPhone,
        office: result.officeAddress
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative text-gray-900">
        
        {/* Header */}
        <div className="bg-[#082B63] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B3D91] flex items-center justify-center font-bold text-white text-xs">
              ₹100
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {lang === 'hi' ? 'सीधा संपर्क एवं शेड पता अनलॉक करें' : 'Unlock Direct Phone & Shed Address'}
              </h3>
              <p className="text-[11px] text-blue-200/80">Direct connection with verified professional</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pro summary */}
        <div className="p-5 border-b border-gray-100 bg-slate-50/50 flex items-center gap-4">
          <img 
            src={pro.image} 
            alt={pro.name} 
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-xl object-cover border border-gray-200" 
          />
          <div>
            <span className="text-[10px] font-black uppercase text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {pro.category}
            </span>
            <h4 className="text-sm font-bold text-[#082B63] mt-1">{pro.name}</h4>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>{pro.district} • {pro.office}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-xs space-y-4">
          {unlockedDetails || isAlreadyUnlocked ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Contact Details Unlocked!</span>
              </div>
              
              <div className="space-y-2 pt-2 border-t border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Direct Mobile / WhatsApp:</span>
                  <a 
                    href={`tel:${pro.phone}`} 
                    className="font-bold text-emerald-800 text-sm hover:underline"
                  >
                    {pro.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Office / Shed Address:</span>
                  <span className="font-bold text-emerald-900">{pro.office}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Official License:</span>
                  <span className="font-mono font-bold text-[#082B63]">{pro.licenseNumber}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${pro.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${pro.name}, I found your profile on LegalCure.in for land services in ${pro.district}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat with {pro.name.split(' ')[0]} on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-blue-900 space-y-2">
                <div className="font-bold text-xs flex items-center gap-1.5 text-[#082B63]">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>₹100 Token Protection Guarantee</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Paying ₹100 directly reveals the verified phone number, exact Sub-Registry Office shed number, and initiates WhatsApp intimation. This ₹100 is fully deductible from the final consultation bill.
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Your WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleUnlock}
                className="w-full bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{isProcessing ? 'Processing ₹100 Payment...' : 'Pay ₹100 & Unlock Instant Details'}</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-500">
          Secured by 256-bit SSL Encryption • Instant Receipt on WhatsApp
        </div>

      </div>
    </div>
  );
};
