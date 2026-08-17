import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Building, 
  Phone, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  XCircle,
  MessageSquare,
  Sparkles,
  User,
  Key,
  Layers
} from 'lucide-react';
import { BookingStatus } from '../../types';

export const UserBookingsView: React.FC = () => {
  const { 
    lang, 
    userBookings, 
    contactUnlocks, 
    respondToTimeChange, 
    cancelBookingRequest, 
    showToast, 
    setActiveView,
    setIsWhatsAppDrawerOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'unlocks'>('bookings');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const getStatusBadge = (status: BookingStatus | string) => {
    switch (status) {
      case 'PENDING_PROFESSIONAL':
      case 'BOOKING_REQUESTED':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          text: lang === 'hi' ? 'समीक्षाधीन (कातिब/अमीन को भेजा गया)' : 'Pending Pro Review',
          icon: Clock
        };
      case 'TIME_CHANGE_REQUESTED':
        return {
          bg: 'bg-blue-50 text-[#082B63] border-blue-300',
          text: lang === 'hi' ? 'नया समय प्रस्तावित (कार्रवाई आवश्यक)' : 'Time Change Proposed (Action Req.)',
          icon: AlertCircle
        };
      case 'CONFIRMED':
      case 'Accepted':
      case 'Confirmed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          text: lang === 'hi' ? 'पुष्टि हो गई (Confirmed)' : 'Confirmed & Scheduled',
          icon: CheckCircle2
        };
      case 'COMPLETED':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          text: lang === 'hi' ? 'सेवा पूर्ण (Completed)' : 'Completed',
          icon: CheckCircle2
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-50 text-red-800 border-red-200',
          text: lang === 'hi' ? 'अस्वीकृत (₹100 रिफंडेड)' : 'Rejected (Token Refunded)',
          icon: XCircle
        };
      case 'CANCELLED':
      case 'Cancelled':
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          text: lang === 'hi' ? 'रद्द (Cancelled)' : 'Cancelled',
          icon: XCircle
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          text: status,
          icon: Clock
        };
    }
  };

  const filteredBookings = userBookings.filter(b => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'ACTIVE') {
      return ['PENDING_PROFESSIONAL', 'BOOKING_REQUESTED', 'TIME_CHANGE_REQUESTED', 'CONFIRMED', 'Confirmed'].includes(b.status);
    }
    if (filterStatus === 'COMPLETED') {
      return b.status === 'COMPLETED';
    }
    return true;
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">
              {lang === 'hi' ? 'ग्राहक डैशबोर्ड' : 'Client Dashboard'}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600 font-semibold">User: Vivek Ranjan (Patna)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
            {lang === 'hi' ? 'मेरी बुकिंग्स एवं संपर्क विवरण' : 'My Land Appointments & Unlocks'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {lang === 'hi'
              ? 'आपके द्वारा बुक किए गए कातिब व अमीन की स्थिति एवं टोकन रसीदें।'
              : 'Track booking lifecycle, accept proposed time changes, and view unlocked shed contacts.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsWhatsAppDrawerOpen(true)}
            className="border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Feed</span>
          </button>

          <button
            onClick={() => {
              setActiveView('professionals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#082B63] hover:bg-[#0B3D91] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>{lang === 'hi' ? '+ नया स्लॉट खोजें' : '+ Book Another Slot'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'bookings' 
              ? 'border-[#082B63] text-[#082B63]' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Bookings & State Tracking ({userBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('unlocks')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'unlocks' 
              ? 'border-[#082B63] text-[#082B63]' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Unlocked Contacts ({contactUnlocks.length})</span>
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div>
          {/* Quick Filter */}
          <div className="flex gap-2 mb-6 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterStatus === 'ALL' ? 'bg-[#082B63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({userBookings.length})
            </button>
            <button
              onClick={() => setFilterStatus('ACTIVE')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterStatus === 'ACTIVE' ? 'bg-[#082B63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active & Pending
            </button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-xs">
              <div className="w-16 h-16 bg-blue-50 text-[#0B3D91] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#082B63] mb-2">
                {lang === 'hi' ? 'कोई सक्रिय बुकिंग नहीं है' : 'No Bookings Found'}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {lang === 'hi'
                  ? 'अपनी जमीन के केवाला, नापी या दाखिल खारिज के लिए प्रमाणित विशेषज्ञ खोजें और ₹100 टोकन से बुक करें।'
                  : 'Connect with a verified deed writer or amin land surveyor across Bihar.'}
              </p>
              <button
                onClick={() => setActiveView('professionals')}
                className="bg-[#082B63] hover:bg-[#0B3D91] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                {lang === 'hi' ? 'विशेषज्ञ सूची देखें' : 'Explore Professionals'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((b) => {
                const badge = getStatusBadge(b.status);
                const BadgeIcon = badge.icon;
                const isTimeChange = b.status === 'TIME_CHANGE_REQUESTED';

                return (
                  <div
                    key={b.id}
                    className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all flex flex-col justify-between gap-6 relative ${
                      isTimeChange ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200/90 hover:border-blue-300'
                    }`}
                  >
                    {/* Top Row */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0B3D91] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                            {b.bookingNumber}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                            <BadgeIcon className="w-3 h-3" />
                            <span>{badge.text}</span>
                          </span>
                        </div>

                        <span className="text-gray-400 text-xs font-medium">
                          Booked on: {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Main Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Pro info */}
                        <div>
                          <span className="text-gray-400 uppercase font-bold text-[10px]">Professional</span>
                          <h3 className="text-base font-bold text-[#082B63] mt-0.5">{b.professionalName}</h3>
                          <p className="text-[#0B3D91] font-semibold text-xs">{b.professionalCategory}</p>
                          <div className="text-gray-500 flex items-center gap-1 mt-1">
                            <Building className="w-3 h-3" />
                            <span>{b.professionalOffice}</span>
                          </div>
                        </div>

                        {/* Appointment Slot */}
                        <div>
                          <span className="text-gray-400 uppercase font-bold text-[10px]">Requested Slot</span>
                          <div className="flex items-center gap-1.5 font-bold text-gray-800 text-sm mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-[#0B3D91]" />
                            <span>{b.appointmentDate} at {b.appointmentTime}</span>
                          </div>
                          <div className="text-gray-500 mt-1">
                            Service: <strong className="text-gray-800">{b.serviceSelected}</strong>
                          </div>
                          {b.plotDetails?.khataNumber && (
                            <div className="text-gray-500 text-[11px] mt-0.5">
                              Khata: {b.plotDetails.khataNumber}, Khesra: {b.plotDetails.khesraNumber}
                            </div>
                          )}
                        </div>

                        {/* Payment & Token */}
                        <div className="md:text-right">
                          <span className="text-gray-400 uppercase font-bold text-[10px]">Token Protection</span>
                          <div className="text-base font-black text-emerald-700 mt-0.5">
                            ₹{b.tokenPaid || 100} <span className="text-xs text-gray-500 font-normal">Paid (Held Safe)</span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1">
                            Estimated Fee: ₹{b.professionalFee} (Adjustable)
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                            Txn: {b.transactionId || 'TXN-ONLINE-BHR'}
                          </div>
                        </div>
                      </div>

                      {/* Time Change Action Banner if Pro suggested alternative slot */}
                      {isTimeChange && (
                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-3 animate-in fade-in-50">
                          <div className="flex items-center gap-2 font-bold text-[#082B63]">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <span>Katib / Amin has proposed an alternative appointment time:</span>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center justify-between font-bold text-sm text-[#082B63]">
                            <span>📅 Proposed: {b.suggestedDate || b.appointmentDate} at {b.suggestedTime || '02:30 PM'}</span>
                            <span className="text-xs text-gray-500 font-medium">Slot adjustment due to Sub-Registry token hours</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => respondToTimeChange(b.id, true)}
                              className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept Proposed Time</span>
                            </button>

                            <button
                              onClick={() => respondToTimeChange(b.id, false)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Decline (Refund Token)</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        {b.professionalPhone && (
                          <a
                            href={`https://wa.me/${b.professionalPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.professionalName}, I am following up on LegalCure booking ${b.bookingNumber}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp Pro</span>
                          </a>
                        )}

                        <button
                          onClick={handleDownload}
                          className="text-gray-600 hover:text-[#082B63] px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Print Receipt</span>
                        </button>
                      </div>

                      {['PENDING_PROFESSIONAL', 'BOOKING_REQUESTED', 'CONFIRMED'].includes(b.status) && (
                        <button
                          onClick={() => cancelBookingRequest(b.id)}
                          className="text-red-600 hover:text-red-800 hover:underline font-bold text-xs"
                        >
                          Cancel Booking & Refund Token
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'unlocks' && (
        <div className="space-y-4">
          {contactUnlocks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto">
              <Key className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#082B63]">No Unlocked Contacts Yet</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Unlock direct phone numbers and shed addresses of verified Katibs & Amins with a ₹100 token fee.
              </p>
              <button
                onClick={() => setActiveView('professionals')}
                className="bg-[#082B63] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Browse Professionals
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactUnlocks.map((u) => (
                <div key={u.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Unlocked & Active
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {new Date(u.unlockedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#082B63]">{u.professionalName}</h3>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{u.officeAddress}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] block">Direct Contact</span>
                      <a href={`tel:${u.professionalPhone}`} className="font-bold text-[#082B63] hover:underline">
                        {u.professionalPhone}
                      </a>
                    </div>

                    <a
                      href={`https://wa.me/${u.professionalPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${u.professionalName}, I unlocked your contact details on LegalCure.in for land registration services.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
