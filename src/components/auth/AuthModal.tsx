import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, User, Briefcase, Key, Mail, Phone, ArrowRight, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalTab, 
    closeAuthModal, 
    openAuthModal, 
    loginUser, 
    signupUser,
    switchRole,
    lang 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>(authModalTab);
  const [role, setRole] = useState<UserRole>('customer');
  
  // Form fields
  const [email, setEmail] = useState('vivek.patna@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Patna');
  const [location, setLocation] = useState('Patna Sadar');
  const [licenseNumber, setLicenseNumber] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveTab(authModalTab);
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

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !phone || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await signupUser({
        name,
        email,
        phone,
        role,
        district,
        location,
        licenseNumber: role === 'professional' ? licenseNumber : undefined
      });
      closeAuthModal();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchRole(targetRole);
    closeAuthModal();
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

          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-[#0B3D91] flex items-center justify-center font-bold text-white text-sm">
              LC
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              LegalCure.in Account
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {activeTab === 'login' && (lang === 'hi' ? 'लीगलक्योर में लॉगिन करें' : 'Sign in to LegalCure')}
            {activeTab === 'signup' && (lang === 'hi' ? 'नया खाता बनाएं' : 'Create an Account')}
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

        {/* Tab Toggle */}
        <div className="flex border-b border-gray-100 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'login' 
                ? 'border-[#082B63] text-[#082B63] bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-900 bg-gray-50'
            }`}
          >
            {lang === 'hi' ? 'लॉगिन' : 'Log In'}
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setError(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'signup' 
                ? 'border-[#082B63] text-[#082B63] bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-900 bg-gray-50'
            }`}
          >
            {lang === 'hi' ? 'पंजीकरण (Sign Up)' : 'Sign Up'}
          </button>
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
            </form>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">I want to register as:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      role === 'customer' 
                        ? 'border-[#082B63] bg-blue-50 text-[#082B63]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Client / Buyer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('professional')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      role === 'professional' 
                        ? 'border-[#082B63] bg-blue-50 text-[#082B63]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Katib / Amin Pro</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
                  />
                </div>
              </div>

              {role === 'professional' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Registration / License / Amin Certificate No.
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DW/BHR/PAT/2016/049"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Set Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md mt-2"
              >
                {lang === 'hi' ? 'खाता बनाएं एवं जारी रखें' : 'Create Account & Continue'}
              </button>
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
