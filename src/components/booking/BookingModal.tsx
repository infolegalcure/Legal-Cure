import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { professionalService } from '../../services/professionalService';
import { Booking } from '../../types';
import confetti from 'canvas-confetti';
import { 
  X, CheckCircle2, ShieldCheck, Calendar, Clock, CreditCard, 
  MapPin, FileText, ArrowRight, ArrowLeft, Download, Share2, Sparkles, AlertCircle
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    lang, 
    selectedProForBooking, 
    setSelectedProForBooking, 
    showToast,
    refreshBookings,
    setActiveView 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service & Slot, 2: Client & Plot Info, 3: Summary & Pay, 4: Success Receipt
  
  // Step 1 states
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
  );
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Step 2 states
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [khataNumber, setKhataNumber] = useState<string>('');
  const [khesraNumber, setKhesraNumber] = useState<string>('');
  const [mauza, setMauza] = useState<string>('');
  const [thanaNumber, setThanaNumber] = useState<string>('');
  const [areaSize, setAreaSize] = useState<string>('2 Katha');
  const [notes, setNotes] = useState<string>('');

  // Payment mock states
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiId, setUpiId] = useState<string>('user@okaxis');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  if (!selectedProForBooking) return null;
  const pro = selectedProForBooking;

  // Initialize service & slot if empty
  if (!selectedService && pro.services.length > 0) {
    setSelectedService(pro.services[0]);
  }
  if (!selectedTime && pro.timeSlots.length > 0) {
    setSelectedTime(pro.timeSlots[0]);
  }

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      showToast('Please select a service, date, and appointment slot', 'error');
      return;
    }
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      showToast('Please enter your full name and mobile number', 'error');
      return;
    }
    if (clientPhone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep(3);
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate Razorpay / UPI gateway network delay
      await new Promise(r => setTimeout(r, 1200));

      const newBooking = await professionalService.createBooking({
        professionalId: pro.id,
        professionalName: pro.name,
        professionalCategory: pro.category,
        professionalPhone: pro.phone,
        professionalOffice: pro.office,
        clientName,
        clientPhone,
        clientEmail: clientEmail || undefined,
        district: pro.district,
        serviceSelected: selectedService,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        plotDetails: {
          khataNumber,
          khesraNumber,
          mauza,
          thanaNumber,
          areaSize
        },
        professionalFee: pro.fee,
        status: 'Confirmed',
        paymentMethod,
        transactionId: `PAY/BHR/${Date.now().toString().slice(-8)}`,
        notes
      });

      setCompletedBooking(newBooking);
      await refreshBookings();
      setStep(4);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      showToast(lang === 'hi' ? 'बुकिंग सफल! ₹100 टोकन प्राप्त हुआ।' : 'Appointment Confirmed! ₹100 Token Received.', 'success');
    } catch (e) {
      showToast('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    if (!completedBooking) return;
    const text = encodeURIComponent(
      `*LegalCure.in Booking Confirmed!*\n\n` +
      `Booking ID: ${completedBooking.bookingNumber}\n` +
      `Professional: ${completedBooking.professionalName} (${completedBooking.professionalCategory})\n` +
      `Office: ${completedBooking.professionalOffice}\n` +
      `Service: ${completedBooking.serviceSelected}\n` +
      `Date & Time: ${completedBooking.appointmentDate} at ${completedBooking.appointmentTime}\n` +
      `Token Paid: ₹100 (Adjustable in final fee of ₹${completedBooking.professionalFee})\n\n` +
      `Location: Bihar Registration Hub`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleFinish = () => {
    setSelectedProForBooking(null);
    setActiveView('bookings');
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6"
        id="booking-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProForBooking(null)}
          className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-navy p-6 text-white rounded-t-3xl border-b border-blue-900">
          <div className="flex items-center gap-2 mb-1 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? '100% सुरक्षित ₹100 टोकन स्लॉट बुकिंग' : '100% Verified Token Booking'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'hi' ? 'अपॉइंटमेंट स्लॉट बुक करें' : 'Book Consultation Slot'}
          </h2>
          <p className="text-xs text-blue-200 mt-0.5">
            {pro.name} • {pro.category} • {pro.office}
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-blue-800/60 text-xs">
            <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-white' : 'text-blue-300/50'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-primary text-white' : 'bg-white/10'}`}>1</span>
              <span>{lang === 'hi' ? 'सेवा व समय' : 'Service & Slot'}</span>
            </div>
            <div className="h-px w-6 bg-blue-800" />
            <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-white' : 'text-blue-300/50'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-primary text-white' : 'bg-white/10'}`}>2</span>
              <span>{lang === 'hi' ? 'जमीन व विवरण' : 'Plot Info'}</span>
            </div>
            <div className="h-px w-6 bg-blue-800" />
            <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-white' : 'text-blue-300/50'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-primary text-white' : 'bg-white/10'}`}>3</span>
              <span>{lang === 'hi' ? 'टोकन भुगतान' : 'Pay ₹100'}</span>
            </div>
          </div>
        </div>

        {/* Step 1: Service & Slot Selection */}
        {step === 1 && (
          <form onSubmit={handleNextToStep2} className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                {lang === 'hi' ? '1. आवश्यक सेवा चुनें' : '1. Select Required Service'}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {pro.services.map((service, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedService === service 
                        ? 'border-primary bg-blue-50/70 text-navy font-bold shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="service"
                        value={service}
                        checked={selectedService === service}
                        onChange={() => setSelectedService(service)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm">{service}</span>
                    </div>
                    <span className="text-[11px] font-bold text-primary bg-white px-2 py-0.5 rounded-md border border-blue-100">
                      Standard
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {lang === 'hi' ? 'अपॉइंटमेंट तिथि' : 'Select Date'}
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary font-semibold text-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {lang === 'hi' ? 'उपलब्ध समय स्लॉट' : 'Available Time Slot'}
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary font-semibold text-navy cursor-pointer"
                >
                  {pro.timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-navy text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>{lang === 'hi' ? 'आगे बढ़ें (विवरण दर्ज करें)' : 'Continue to Plot Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Client Info & Land Plot Details */}
        {step === 2 && (
          <form onSubmit={handleNextToStep3} className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
                {lang === 'hi' ? 'ग्राहक का संपर्क विवरण' : 'Client Contact Details'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Verma"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर (SMS/WhatsApp) *' : 'Mobile Number (10 Digits) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Plot / Land details for Deed / Survey / Check */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                  {lang === 'hi' ? 'जमीन / प्लॉट विवरण (वैकल्पिक परंतु उपयोगी)' : 'Land / Plot Identification (Optional)'}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">Khata / Khesra / Mauza</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'खाता संख्या (Khata)' : 'Khata No.'}
                  </label>
                  <input
                    type="text"
                    value={khataNumber}
                    onChange={(e) => setKhataNumber(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'खेसरा संख्या (Khesra)' : 'Khesra / Plot'}
                  </label>
                  <input
                    type="text"
                    value={khesraNumber}
                    onChange={(e) => setKhesraNumber(e.target.value)}
                    placeholder="e.g. 108"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'मौजा / थाना नं' : 'Mauza / Thana'}
                  </label>
                  <input
                    type="text"
                    value={mauza}
                    onChange={(e) => setMauza(e.target.value)}
                    placeholder="e.g. Sabour (Thana 184)"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'रकबा / क्षेत्रफल (Area Size in Katha/Decimal)' : 'Plot Area (Katha / Decimal)'}
                  </label>
                  <input
                    type="text"
                    value={areaSize}
                    onChange={(e) => setAreaSize(e.target.value)}
                    placeholder="e.g. 4 Katha / 12.5 Decimal"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                {lang === 'hi' ? 'विशेष निर्देश या आवश्यकता (Notes)' : 'Special Requirements / Notes'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'hi' ? 'जैसे: रजिस्ट्री के दिन उपस्थित रहेंगे, या जमीन सीमांकन कराना है...' : 'e.g. Need urgent sale deed drafting for registration on Thursday...'}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-navy flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पीछे जाएं' : 'Back'}</span>
              </button>

              <button
                type="submit"
                className="bg-primary hover:bg-navy text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>{lang === 'hi' ? 'बुकिंग सारांश देखें' : 'View Summary & Pay Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Booking Summary & Payment Sheet (Requirement #25-26) */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
                {lang === 'hi' ? 'बुकिंग सारांश' : 'Booking Summary & Token Breakdown'}
              </h3>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lang === 'hi' ? 'विशेषज्ञ:' : 'Professional:'}</span>
                  <span className="font-bold text-navy">{pro.name} ({pro.category})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lang === 'hi' ? 'कार्यालय:' : 'Office / Shed:'}</span>
                  <span className="font-bold text-navy">{pro.office}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lang === 'hi' ? 'सेवा:' : 'Selected Service:'}</span>
                  <span className="font-bold text-primary">{selectedService}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lang === 'hi' ? 'अपॉइंटमेंट समय:' : 'Appointment:'}</span>
                  <span className="font-bold text-navy">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lang === 'hi' ? 'ग्राहक:' : 'Client Name:'}</span>
                  <span className="font-bold text-navy">{clientName} ({clientPhone})</span>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">{lang === 'hi' ? 'कुल परामर्श व सेवा शुल्क' : 'Total Professional Fee'}</span>
                    <span className="font-bold text-navy">₹{pro.fee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 font-semibold">
                    <span>{lang === 'hi' ? 'लीगलक्योर टोकन (Payable Now)' : 'LegalCure Token (Payable Now)'}</span>
                    <span>₹100</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 text-[11px]">
                    <span>{lang === 'hi' ? 'कार्यालय में देय शेष राशि' : 'Remaining Balance at Office'}</span>
                    <span>₹{Math.max(0, pro.fee - 100).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Explanation Callout (Requirement #26) */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-navy mb-0.5">
                    {lang === 'hi' ? 'लीगलक्योर टोकन सुरक्षा' : 'The ₹100 LegalCure Token Guarantee'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {lang === 'hi' 
                      ? '* यह टोकन प्लेटफॉर्म बुकिंग शुल्क है। यह आपके स्लॉट को सुनिश्चित करता है और आपके अंतिम सेवा बिल में पूरी तरह घटा दिया जाएगा।'
                      : '* The LegalCure token is a platform booking fee. It is non-refundable and fully adjustable against your final consultation fee at the office.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                {lang === 'hi' ? 'भुगतान माध्यम चुनें' : 'Select Payment Method'}
              </label>
              <div className="grid grid-cols-3 gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'UPI' ? 'border-primary bg-blue-50/60 text-primary shadow-xs' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <span>UPI / QR</span>
                  <span className="text-[10px] text-slate-400 font-normal">GPay / PhonePe / Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'Card' ? 'border-primary bg-blue-50/60 text-primary shadow-xs' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <span>Debit / Credit</span>
                  <span className="text-[10px] text-slate-400 font-normal">Visa / RuPay / MC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'NetBanking' ? 'border-primary bg-blue-50/60 text-primary shadow-xs' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <span>Net Banking</span>
                  <span className="text-[10px] text-slate-400 font-normal">SBI / PNB / HDFC</span>
                </button>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-600 hover:text-navy flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पीछे जाएं' : 'Back'}</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleExecutePayment}
                id="btn-pay-token-confirm"
                className="bg-primary hover:bg-navy text-white text-sm font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing ₹100...</span>
                  </span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{lang === 'hi' ? '₹100 टोकन देकर कन्फर्म करें' : 'Pay ₹100 Token & Confirm'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success Receipt Modal View */}
        {step === 4 && completedBooking && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Payment Successful • ₹100 Token Received
              </span>
              <h3 className="text-2xl font-extrabold text-navy mt-2">
                {lang === 'hi' ? 'अपॉइंटमेंट सफलतापूर्वक कन्फर्म हुआ!' : 'Booking Confirmed Successfully!'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'hi' 
                  ? 'आपके पंजीकृत मोबाइल नंबर पर एसएमएस व व्हाट्सएप पुष्टि भेजी गई है।'
                  : 'Confirmation SMS and WhatsApp receipt have been dispatched.'}
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Booking Reference</span>
                  <div className="font-extrabold text-primary text-sm">{completedBooking.bookingNumber}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Transaction ID</span>
                  <div className="font-semibold text-slate-700">{completedBooking.transactionId}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px]">Professional:</span>
                  <span className="font-bold text-navy">{completedBooking.professionalName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Office:</span>
                  <span className="font-bold text-navy">{completedBooking.professionalOffice}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date & Slot:</span>
                  <span className="font-bold text-navy">{completedBooking.appointmentDate} • {completedBooking.appointmentTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Service:</span>
                  <span className="font-bold text-primary">{completedBooking.serviceSelected}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Token Paid:</span>
                <span className="text-emerald-700 font-extrabold">₹100 (100% Guaranteed)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Balance at Office:</span>
                <span className="text-navy">₹{completedBooking.remainingAtOffice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="text-xs font-bold text-navy bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'रसीद प्रिंट / डाउनलोड करें' : 'Print / Download Receipt'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
              </button>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-navy hover:bg-primary text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl transition-all shadow-md mt-4"
            >
              {lang === 'hi' ? 'मेरी बुकिंग्स में देखें' : 'View in My Bookings'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
