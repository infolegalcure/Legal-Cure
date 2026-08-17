import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  DollarSign, 
  FileText, 
  UserCheck, 
  ShieldCheck, 
  AlertCircle, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Settings,
  MessageSquare,
  XCircle,
  RefreshCw,
  Users,
  Building,
  Key
} from 'lucide-react';
import { Booking } from '../../types';

export const ProfessionalDashboardView: React.FC = () => {
  const { 
    lang, 
    userBookings, 
    leads,
    acceptBookingRequest, 
    suggestNewTimeForBooking, 
    rejectBookingRequest, 
    showToast,
    setIsWhatsAppDrawerOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'leads' | 'verification' | 'earnings' | 'settings'>('appointments');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  // Time change modal state
  const [timeChangeBookingId, setTimeChangeBookingId] = useState<string | null>(null);
  const [proposedDate, setProposedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [proposedTime, setProposedTime] = useState<string>('02:30 PM');

  const pendingBookings = userBookings.filter(b => b.status === 'PENDING_PROFESSIONAL' || b.status === 'BOOKING_REQUESTED');
  const activeConfirmedBookings = userBookings.filter(b => b.status === 'CONFIRMED' || b.status === 'Confirmed' || b.status === 'IN_PROGRESS');

  const handleOpenTimeChangeModal = (bookingId: string) => {
    setTimeChangeBookingId(bookingId);
  };

  const handleSubmitTimeChange = async () => {
    if (!timeChangeBookingId) return;
    await suggestNewTimeForBooking(timeChangeBookingId, proposedDate, proposedTime);
    setTimeChangeBookingId(null);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="bg-[#082B63] rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden shadow-xl border border-blue-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">Rajesh Kumar Singh</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Govt Verified Katib
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                License #BGP/DW/2009/482 • Bhagalpur Sadar Registry Office (Shed #14)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsWhatsAppDrawerOpen(true)}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Alerts</span>
            </button>

            <button
              onClick={() => {
                setIsAvailable(!isAvailable);
                showToast(isAvailable ? 'Status: Offline' : 'Status: Online & Accepting Bookings', 'info');
              }}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                isAvailable ? 'bg-[#10B981] text-slate-950' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-slate-950 animate-pulse' : 'bg-slate-400'}`} />
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
            { id: 'appointments', labelEn: 'Incoming Queue & Bookings', labelHi: 'आगामी नियुक्तियां', icon: Calendar, badge: `${userBookings.length}` },
            { id: 'leads', labelEn: 'Client Leads & Unlocks', labelHi: 'ग्राहक लीड्स (Unlocks)', icon: Users, badge: `${leads.length}` },
            { id: 'verification', labelEn: 'Verification & License (KYC)', labelHi: 'सत्यापन स्थिति (KYC)', icon: ShieldCheck, badge: '100%' },
            { id: 'earnings', labelEn: 'Token Settlement & Earnings', labelHi: 'कमाई व टोकन सेटलमेंट', icon: DollarSign },
            { id: 'settings', labelEn: 'Office Hours & MVR Rates', labelHi: 'ऑफिस समय व फीस सेटिंग', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#082B63] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{lang === 'hi' ? tab.labelHi : tab.labelEn}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#0B3D91]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Notice */}
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs space-y-2 mt-4">
            <div className="font-bold text-[#082B63] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Bihar Land Registration Rules</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Every Sale Deed (Kewala) token booking on LegalCure guarantees advance slot reservation at Sub-Registry Shed #14 without middleman dispute.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              
              {/* Section 1: Pending Action Requests */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#082B63] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Action Required: Incoming Booking Requests ({pendingBookings.length})</span>
                  </h2>
                  <span className="text-xs text-gray-500">Respond within 2 hours</span>
                </div>

                {pendingBookings.length === 0 ? (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
                    No pending booking requests right now. You are all caught up!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingBookings.map((b) => (
                      <div key={b.id} className="bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-sm space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded">
                              {b.bookingNumber}
                            </span>
                            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              Pending Pro Decision
                            </span>
                          </div>
                          <span className="text-xs font-black text-emerald-700">₹{b.tokenPaid || 100} Token Paid</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-gray-400 uppercase text-[10px] font-bold">Client</span>
                            <div className="font-bold text-[#082B63] mt-0.5">{b.clientName}</div>
                            <div className="text-gray-500">{b.clientPhone}</div>
                          </div>

                          <div>
                            <span className="text-gray-400 uppercase text-[10px] font-bold">Requested Slot & Service</span>
                            <div className="font-bold text-gray-900 mt-0.5">{b.appointmentDate} at {b.appointmentTime}</div>
                            <div className="text-[#0B3D91] font-semibold">{b.serviceSelected}</div>
                          </div>

                          <div>
                            <span className="text-gray-400 uppercase text-[10px] font-bold">Plot Khata / Khesra</span>
                            <div className="font-mono text-gray-800 mt-0.5">
                              {b.plotDetails?.khataNumber ? `Khata: ${b.plotDetails.khataNumber}, Khesra: ${b.plotDetails.khesraNumber}` : 'General Inquiry'}
                            </div>
                            <div className="text-gray-500 text-[11px]">Area: {b.plotDetails?.areaSize || '2 Katha'}</div>
                          </div>
                        </div>

                        {/* 3 Action Buttons */}
                        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => acceptBookingRequest(b.id)}
                            className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept Booking</span>
                          </button>

                          <button
                            onClick={() => handleOpenTimeChangeModal(b.id)}
                            className="bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Suggest Another Time</span>
                          </button>

                          <button
                            onClick={() => rejectBookingRequest(b.id, 'Deed Writer unavailable during registry token filing hours')}
                            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject & Refund Token</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Confirmed Appointments */}
              <div>
                <h2 className="text-base font-bold text-[#082B63] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Scheduled & In-Progress Appointments ({activeConfirmedBookings.length})</span>
                </h2>

                <div className="space-y-3">
                  {activeConfirmedBookings.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#082B63] text-sm">{b.clientName}</span>
                          <span className="bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                            Confirmed
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {b.serviceSelected} • <strong>{b.appointmentDate} at {b.appointmentTime}</strong>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Location: Shed #14, Bhagalpur Registry Office
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${b.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.clientName}, this is Rajesh Kumar Singh (Katib). Looking forward to our appointment on ${b.appointmentDate} for ${b.serviceSelected}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#082B63]">Client Inquiries & Unlocked Leads</h2>
                  <p className="text-xs text-gray-500">Clients who unlocked your contact details or requested consultations</p>
                </div>
                <span className="bg-blue-50 text-[#082B63] text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  {leads.length} Active Leads
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leads.map((ld) => (
                  <div key={ld.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#082B63] text-sm">{ld.clientName}</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {ld.serviceType}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0B3D91]" />
                      <span className="font-mono font-bold">{ld.clientPhone}</span>
                    </div>

                    <div className="text-gray-500 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                      {ld.message || 'Client inquired regarding circle rate calculation & Kewala drafting.'}
                    </div>

                    <a
                      href={`https://wa.me/${ld.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${ld.clientName}, I am Rajesh Kumar Singh (Katib). I received your inquiry on LegalCure for ${ld.serviceType}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact via WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#082B63]">Government Verification & Physical Shed Check</h2>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-emerald-900">Registration Department License: BGP/DW/2009/482</div>
                    <div className="text-emerald-700 text-[11px]">Issued by District Sub-Registrar, Bhagalpur</div>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                    VERIFIED
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-emerald-900">Physical Registry Shed Allocation: Shed #14</div>
                    <div className="text-emerald-700 text-[11px]">Sub-Registry Office Compound, Bhagalpur Sadar</div>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-bold text-[#082B63]">Token Settlements & Earnings</h2>
                  <p className="text-xs text-gray-500">Daily settlement via direct UPI transfer</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#082B63]">₹4,800</div>
                  <div className="text-[10px] text-emerald-700 font-bold">This Month’s Tokens</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-gray-500 font-medium">Total Bookings</span>
                  <div className="text-xl font-bold text-[#082B63] mt-1">48 Completed</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-gray-500 font-medium">Settled to Bank</span>
                  <div className="text-xl font-bold text-emerald-700 mt-1">₹4,800</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
                  <span className="text-gray-500 font-medium">Commission Deducted</span>
                  <div className="text-xl font-bold text-blue-900 mt-1">₹0.00 (Zero Fee)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
              <h2 className="text-base font-bold text-[#082B63]">Office Hours & Consultation Charges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Office Shed Consultation Fee (₹)</label>
                  <input type="number" defaultValue={500} className="w-full border border-gray-300 rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Standard Working Hours</label>
                  <input type="text" defaultValue="10:00 AM - 05:30 PM (Registry Days)" className="w-full border border-gray-300 rounded-xl px-3 py-2" />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Suggest Alternative Time Modal */}
      {timeChangeBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-[#082B63]">Suggest Alternative Time to Client</h3>
            <p className="text-xs text-gray-600">
              Propose another slot if you are occupied with registry token hearings or field surveys.
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Proposed Date:</label>
              <input
                type="date"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Proposed Time Slot:</label>
              <select
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="10:30 AM">10:30 AM (Morning Session)</option>
                <option value="12:00 PM">12:00 PM (Pre-Token)</option>
                <option value="02:30 PM">02:30 PM (Post-Lunch Session)</option>
                <option value="04:00 PM">04:00 PM (Late Registry Slot)</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSubmitTimeChange}
                className="flex-1 bg-[#082B63] hover:bg-[#0B3D91] text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Send Proposal to Client
              </button>
              <button
                onClick={() => setTimeChangeBookingId(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
