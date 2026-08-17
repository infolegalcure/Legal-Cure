import React from 'react';
import { useApp } from '../../context/AppContext';
import { professionalService } from '../../services/professionalService';
import { 
  CalendarCheck, Clock, MapPin, Building, Phone, FileText, CheckCircle2, 
  AlertCircle, Download, Share2, ArrowRight, ShieldCheck, XCircle
} from 'lucide-react';

export const UserBookingsView: React.FC = () => {
  const { lang, userBookings, refreshBookings, showToast, setActiveView } = useApp();

  const handleCancelBooking = async (id: string) => {
    if (window.confirm(lang === 'hi' ? 'क्या आप इस अपॉइंटमेंट को रद्द करना चाहते हैं?' : 'Are you sure you want to cancel this booking?')) {
      await professionalService.cancelBooking(id);
      await refreshBookings();
      showToast(lang === 'hi' ? 'बुकिंग रद्द कर दी गई। ₹100 टोकन रिफंड प्रक्रिया शुरू।' : 'Booking cancelled. ₹100 token refund initiated.', 'info');
    }
  };

  const handleDownload = (bNumber: string) => {
    window.print();
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {lang === 'hi' ? 'आपकी सक्रिय नियुक्तियां' : 'Client Appointments'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 tracking-tight">
            {lang === 'hi' ? 'मेरी बुकिंग्स व टोकन रसीदें' : 'My Bookings & Token Receipts'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'hi'
              ? 'आपके द्वारा बुक किए गए कातिब, वकील व अमीन की सूची और रसीदें।'
              : 'All your scheduled consultations with verified Bihar land experts.'}
          </p>
        </div>

        <button
          onClick={() => setActiveView('professionals')}
          className="bg-primary hover:bg-navy text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>{lang === 'hi' ? '+ नया स्लॉट बुक करें' : '+ Book Another Slot'}</span>
        </button>
      </div>

      {userBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-navy mb-2">
            {lang === 'hi' ? 'कोई सक्रिय बुकिंग नहीं है' : 'No Bookings Yet'}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {lang === 'hi'
              ? 'अपनी जमीन के केवाला, नापी या दाखिल खारिज के लिए प्रमाणित विशेषज्ञ खोजें और ₹100 टोकन से बुक करें।'
              : 'Connect with a verified deed writer, amin surveyor, or lawyer across Bihar.'}
          </p>
          <button
            onClick={() => setActiveView('professionals')}
            className="bg-primary hover:bg-navy text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md"
          >
            {lang === 'hi' ? 'विशेषज्ञ सूची देखें' : 'Explore Professionals'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-6"
            >
              {/* Left Info */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {b.bookingNumber}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    b.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : b.status === 'Cancelled'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {b.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                    {b.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                    {b.status}
                  </span>
                  <span className="text-slate-400 text-xs">• {new Date(b.createdAt).toLocaleDateString()}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy">
                    {b.professionalName}
                  </h3>
                  <p className="text-xs font-semibold text-primary">
                    {b.professionalCategory} • {b.district}
                  </p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-semibold text-navy">{b.appointmentDate} at {b.appointmentTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{b.serviceSelected}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{b.professionalOffice}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium">{b.professionalPhone}</span>
                  </div>
                </div>

                {b.plotDetails?.khataNumber && (
                  <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 flex flex-wrap gap-3 border border-slate-100">
                    <span><strong>Khata:</strong> {b.plotDetails.khataNumber}</span>
                    <span><strong>Khesra:</strong> {b.plotDetails.khesraNumber}</span>
                    {b.plotDetails.mauza && <span><strong>Mauza:</strong> {b.plotDetails.mauza}</span>}
                    {b.plotDetails.areaSize && <span><strong>Area:</strong> {b.plotDetails.areaSize}</span>}
                  </div>
                )}
              </div>

              {/* Right Fee & Actions */}
              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === 'hi' ? 'कुल फीस:' : 'Total Fee:'}</span>
                    <span className="font-bold text-navy">₹{b.professionalFee}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{lang === 'hi' ? 'टोकन भुगतान:' : 'Token Paid:'}</span>
                    <span>₹{b.tokenPaid} (Done)</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>{lang === 'hi' ? 'ऑफिस में देय:' : 'Due at Office:'}</span>
                    <span>₹{b.remainingAtOffice}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleDownload(b.bookingNumber)}
                    className="w-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'रसीद प्रिंट / डाउनलोड' : 'Print Receipt'}</span>
                  </button>

                  {b.status === 'Confirmed' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="w-full text-xs font-bold text-rose-600 hover:bg-rose-50 py-1.5 rounded-xl transition-colors"
                    >
                      {lang === 'hi' ? 'अपॉइंटमेंट रद्द करें' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
