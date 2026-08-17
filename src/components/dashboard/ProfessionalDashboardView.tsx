import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, CheckCircle2, Clock, Calendar, DollarSign, FileText, 
  UserCheck, ShieldCheck, AlertCircle, Phone, MapPin, ChevronRight, Settings
} from 'lucide-react';

export const ProfessionalDashboardView: React.FC = () => {
  const { lang, userBookings, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'verification' | 'earnings' | 'settings'>('appointments');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  // Verification Stepper Steps
  const verificationSteps = [
    { title: '1. Basic Profile & Contact', status: 'Completed', date: '10 May 2026' },
    { title: '2. Govt License / Bar Council ID Upload', status: 'Verified by Admin', date: '12 May 2026' },
    { title: '3. Physical Registry Office / Shed Check', status: 'Verified in Person', date: '15 May 2026' },
    { title: '4. Bank Account & UPI for Token Settlements', status: 'Active (Daily Payouts)', date: '16 May 2026' }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="bg-navy rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden shadow-xl border border-blue-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">Rajesh Kumar Singh</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Govt Verified Katib
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                License #BGP/DW/2009/482 • Bhagalpur Sadar Registry Office (Shed #14)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAvailable(!isAvailable);
                showToast(isAvailable ? 'Status updated to Offline' : 'Status updated to Online & Accepting Bookings', 'info');
              }}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                isAvailable ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-300 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isAvailable ? 'Accepting Token Bookings' : 'Unavailable (Offline)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="space-y-2 lg:col-span-1">
          {[
            { id: 'appointments', labelEn: 'Appointments & Queue', labelHi: 'अपॉइंटमेंट्स व स्लॉट्स', icon: Calendar, badge: `${userBookings.length}` },
            { id: 'verification', labelEn: 'Verification Progress', labelHi: 'सत्यापन स्थिति (KYC)', icon: ShieldCheck, badge: '100%' },
            { id: 'earnings', labelEn: 'Token Settlement & Earnings', labelHi: 'कमाई व टोकन सेटलमेंट', icon: DollarSign },
            { id: 'settings', labelEn: 'Office Hours & Fees', labelHi: 'ऑफिस समय व फीस सेटिंग', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{lang === 'hi' ? tab.labelHi : tab.labelEn}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-primary'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Registry Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1 mt-6">
            <div className="font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Bihar Registry Calendar 2026</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Sub-Registry offices remain closed on official gazetted holidays and Sundays.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          
          {/* Tab 1: Appointments Queue */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-extrabold text-navy">
                  {lang === 'hi' ? 'आगामी अपॉइंटमेंट्स (Queue)' : 'Upcoming Scheduled Appointments'}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {userBookings.length} {lang === 'hi' ? 'बुकिंग्स प्राप्त' : 'Bookings Received'}
                </span>
              </div>

              <div className="space-y-4">
                {userBookings.map((b) => (
                  <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy text-sm">{b.clientName}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ₹100 Token Received
                        </span>
                      </div>
                      <span className="font-bold text-primary">
                        {b.appointmentDate} at {b.appointmentTime}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div><strong>Service:</strong> {b.serviceSelected}</div>
                      <div><strong>Contact:</strong> {b.clientPhone}</div>
                      {b.plotDetails?.khataNumber && (
                        <div><strong>Khata / Khesra:</strong> {b.plotDetails.khataNumber} / {b.plotDetails.khesraNumber}</div>
                      )}
                      <div><strong>Office Location:</strong> {b.professionalOffice}</div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <a 
                        href={`tel:${b.clientPhone}`}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        Call Client
                      </a>
                      <button 
                        onClick={() => showToast('Land Document preparation checklist opened', 'info')}
                        className="text-xs font-bold text-primary bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        View Plot Notes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Verification Progress Stepper (Requirement #8) */}
          {activeTab === 'verification' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-navy">
                  {lang === 'hi' ? 'लाइसेंस एवं भौतिक सत्यापन प्रगति' : 'Official Verification Stepper (100% Complete)'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your profile is fully verified and displayed with the "Govt Verified" badge to property buyers in Bihar.
                </p>
              </div>

              <div className="space-y-6 relative border-l-2 border-emerald-500 ml-4 pl-6 pt-2">
                {verificationSteps.map((s, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs">
                      ✓
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-navy">{s.title}</div>
                    <div className="text-xs text-emerald-700 font-semibold mt-0.5">{s.status} • {s.date}</div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>
                  <strong>All Clear:</strong> Your deed writing license #BGP/DW/2009/482 is valid through March 2029 with the Bihar District Registration Office.
                </span>
              </div>
            </div>
          )}

          {/* Tab 3: Earnings & Token Settlement */}
          {activeTab === 'earnings' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-extrabold text-navy">
                {lang === 'hi' ? 'कमाई व टोकन सेटलमेंट' : 'Earnings & Token Settlements'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">This Month Completed</span>
                  <div className="text-2xl font-black text-navy mt-1">28 Cases</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Token Payouts (UPI)</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">₹2,800</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Office Consultations</span>
                  <div className="text-2xl font-black text-primary mt-1">₹56,000</div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                * LegalCure token payouts (₹100 per client) are settled directly to your registered UPI ID every evening at 8:00 PM.
              </p>
            </div>
          )}

          {/* Tab 4: Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-extrabold text-navy">
                {lang === 'hi' ? 'परामर्श फीस व कार्यालय समय' : 'Consultation Fee & Working Hours'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Standard Kewala Drafting Fee (₹)</label>
                  <input
                    type="number"
                    defaultValue={2000}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Registry Office Shed Number</label>
                  <input
                    type="text"
                    defaultValue="Shed #14, Bhagalpur Registry Campus"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('Profile settings saved successfully', 'success')}
                className="bg-primary hover:bg-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Save Changes
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
