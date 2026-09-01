import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Briefcase, Key, Mail, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserRole } from '../../types';
import legalcureLogo from '../../assets/images/legalcure_logo_1786984287741.jpg';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalTab, 
    closeAuthModal, 
    loginUser, 
    switchRole,
    setActiveView,
    lang 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'forgot'>('login');
  
  // Form fields
  const [email, setEmail] = useState('vivek.patna@gmail.com');
  const [password, setPassword] = useState('password123');
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveTab(authModalTab === 'forgot' ? 'forgot' : 'login');
    setError(null);
    setSuccessMsg(null);
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await loginUser(email, password);
      if (user) {
        closeAuthModal();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchRole(targetRole);
    closeAuthModal();
  };

  const handleGoToProRegister = () => {
    closeAuthModal();
    setActiveView('pro_register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative text-gray-900"
        id="auth-modal"
      >
        {/* Header */}
        <div className="bg-[#082B63] p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-400/40 bg-[#05162e] shrink-0 flex items-center justify-center">
              <img 
                src={legalcureLogo} 
                alt="LegalCure" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              LegalCure.in Account
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {activeTab === 'login' && (lang === 'hi' ? 'लीगलक्योर में लॉगिन करें' : 'Sign in to LegalCure')}
            {activeTab === 'forgot' && (lang === 'hi' ? 'पासवर्ड रीसेट' : 'Reset Password')}
          </h3>
          <p className="text-xs text-blue-200/80 mt-1">
            {lang === 'hi' 
              ? 'बिहार में भूमि व निबंधन सेवाओं के लिए सुरक्षित पोर्टल' 
              : 'Secure access for clients, deed writers & certified amins'}
          </p>
        </div>

        {/* Quick Demo Logins Bar */}
        <div className="bg-blue-50 px-6 py-2.5 border-b border-blue-100 flex items-center justify-between text-xs">
          <span className="font-bold text-[#082B63]">1-Click Demo Login:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleQuickLogin('customer')}
              className="bg-white border border-blue-200 hover:border-blue-400 text-[#082B63] font-bold px-2 py-0.5 rounded text-[11px] transition-colors"
            >
              User
            </button>
            <button
              onClick={() => handleQuickLogin('professional')}
              className="bg-white border border-blue-200 hover:border-blue-400 text-[#082B63] font-bold px-2 py-0.5 rounded text-[11px] transition-colors"
            >
              Katib Pro
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="bg-white border border-blue-200 hover:border-blue-400 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vivek.patna@gmail.com"
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-[11px] text-[#0B3D91] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#082B63]/20 focus:border-[#082B63]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <span>{lang === 'hi' ? 'लॉगिन करें' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Link to Professional Registration */}
              <div className="pt-3 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-600 mb-2">
                  {lang === 'hi' ? 'क्या आप कातिब या अमीन हैं?' : 'Are you a Deed Writer or Amin?'}
                </p>
                <button
                  type="button"
                  onClick={handleGoToProRegister}
                  className="w-full py-2.5 px-3 border border-[#082B63] text-[#082B63] hover:bg-blue-50/70 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-[#0B3D91]" />
                  <span>{lang === 'hi' ? 'प्रोफेशनल रजिस्ट्रेशन करें' : 'Register as Professional'}</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-600">
                Enter your registered mobile number or email to receive a password recovery link via WhatsApp / SMS.
              </p>
              <input
                type="text"
                placeholder="Mobile number or Email"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
              />
              <button
                type="button"
                onClick={() => {
                  setSuccessMsg('Password reset OTP sent to your WhatsApp number.');
                  setTimeout(() => setActiveTab('login'), 2000);
                }}
                className="w-full bg-[#082B63] text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-800"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-[11px] text-gray-500">
          By continuing, you agree to LegalCure’s Terms of Service and Bihar Land Data Compliance.
        </div>
      </div>
    </div>
  );
};
