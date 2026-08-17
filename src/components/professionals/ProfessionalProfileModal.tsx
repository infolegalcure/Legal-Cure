import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { professionalService } from '../../services/professionalService';
import { 
  X, CheckCircle2, Star, MapPin, Building, ShieldCheck, Phone, 
  MessageSquare, Calendar, Clock, Award, Briefcase, ChevronRight, UserPlus
} from 'lucide-react';

export const ProfessionalProfileModal: React.FC = () => {
  const { 
    lang, 
    selectedProForProfile, 
    setSelectedProForProfile, 
    setSelectedProForBooking,
    showToast,
    refreshProfessionals
  } = useApp();

  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedProForProfile) return null;
  const pro = selectedProForProfile;

  const handleBookClick = () => {
    const currentPro = pro;
    setSelectedProForProfile(null);
    setSelectedProForBooking(currentPro);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast('Please enter your name and review', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const updated = await professionalService.addReview(pro.id, {
        userName: reviewName,
        userLocation: reviewLocation || pro.district,
        rating: reviewRating,
        comment: reviewComment
      });

      if (updated) {
        setSelectedProForProfile(updated);
        await refreshProfessionals();
        showToast(lang === 'hi' ? 'समीक्षा सफलतापूर्वक दर्ज की गई!' : 'Review posted successfully!', 'success');
        setReviewName('');
        setReviewLocation('');
        setReviewComment('');
        setShowReviewForm(false);
      }
    } catch (e) {
      showToast('Failed to post review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8"
        id="professional-profile-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProForProfile(null)}
          className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-navy p-6 sm:p-8 text-white relative overflow-hidden rounded-t-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center relative z-10">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20 shadow-lg">
                <img 
                  src={pro.image} 
                  alt={pro.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-2 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {lang === 'hi' ? 'बिहार सरकार निबंधन सत्यापित' : 'Govt License Verified'}
                </span>
                <span className="text-xs text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {pro.licenseNumber}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'hi' && pro.nameHi ? pro.nameHi : pro.name}
              </h2>

              <p className="text-blue-300 font-semibold text-sm">
                {lang === 'hi' && pro.categoryHi ? pro.categoryHi : pro.category}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100 pt-1">
                <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pro.rating}</span>
                  <span className="text-blue-200 font-normal">({pro.reviewCount} {lang === 'hi' ? 'समीक्षाएं' : 'reviews'})</span>
                </div>
                <div>{pro.experience}+ {lang === 'hi' ? 'वर्ष का अनुभव' : 'Years Experience'}</div>
                <div>{pro.totalCasesCompleted}+ {lang === 'hi' ? 'सफल कार्य' : 'Cases Completed'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 text-slate-700">
          
          {/* Quick Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div className="flex items-start gap-2.5">
              <Building className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">
                  {lang === 'hi' ? 'संलग्न कार्यालय / शेड' : 'Attached Office / Shed'}
                </span>
                <span className="font-bold text-navy">{pro.office}</span>
                <p className="text-slate-500 mt-0.5 text-[11px]">{pro.chamberAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">
                  {lang === 'hi' ? 'सत्यापन प्राधिकरण' : 'Issuing Authority'}
                </span>
                <span className="font-bold text-navy">{pro.licenseAuthority}</span>
                <p className="text-emerald-700 font-medium mt-0.5 text-[11px]">
                  ✓ {lang === 'hi' ? 'लाइसेंस चालू व वैध है' : 'License active & verified'}
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-base font-extrabold text-navy mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              {lang === 'hi' ? 'विशेषज्ञ का परिचय व अनुभव' : 'About & Legal Background'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'hi' && pro.aboutHi ? pro.aboutHi : pro.about}
            </p>
          </div>

          {/* Services & Pricing breakdown */}
          <div>
            <h3 className="text-base font-extrabold text-navy mb-3">
              {lang === 'hi' ? 'प्रदान की जाने वाली सेवाएं व शुल्क' : 'Offered Services & Typical Scope'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pro.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-primary/40 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-navy">{service}</span>
                  </div>
                  <span className="text-[11px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-md">
                    {lang === 'hi' ? 'शामिल' : 'Available'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Days & Schedule */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {lang === 'hi' ? 'उपलब्ध कार्य दिवस व समय' : 'Office Consultation Days & Slots'}
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {pro.availableDays.map((day, idx) => (
                <span key={idx} className="bg-white text-navy font-semibold text-xs px-2.5 py-1 rounded-lg border border-blue-200/60 shadow-2xs">
                  {day}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{lang === 'hi' ? 'दैनिक स्लॉट्स:' : 'Daily slots:'}</span>
              {pro.timeSlots.join(' • ')}
            </div>
          </div>

          {/* Client Reviews */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                {lang === 'hi' ? 'ग्राहक समीक्षाएं व रेटिंग' : 'Client Reviews & Feedback'}
              </h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                {showReviewForm ? (lang === 'hi' ? 'फॉर्म छुपाएं' : 'Hide Form') : (lang === 'hi' ? 'समीक्षा लिखें' : 'Write a Review')}
              </button>
            </div>

            {/* Add Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
                  {lang === 'hi' ? 'अपनी सत्यापित समीक्षा जोड़ें' : 'Share Your Experience'}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      {lang === 'hi' ? 'स्थान / मोहल्ला' : 'Your Location / Block'}
                    </label>
                    <input
                      type="text"
                      value={reviewLocation}
                      onChange={(e) => setReviewLocation(e.target.value)}
                      placeholder={`e.g. ${pro.district}`}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'रेटिंग (1 से 5 स्टार)' : 'Rating'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-navy ml-2">{reviewRating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    {lang === 'hi' ? 'आपकी समीक्षा / अनुभव' : 'Your Review Comment'}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={lang === 'hi' ? 'दस्तावेज लेखन, नापी या परामर्श के बारे में बताएं...' : 'Explain how the professional helped with your deed, survey, or registry...'}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-navy hover:bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : (lang === 'hi' ? 'समीक्षा प्रकाशित करें' : 'Post Review')}
                </button>
              </form>
            )}

            <div className="space-y-3">
              {pro.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy">{rev.userName}</span>
                      <span className="text-[10px] text-slate-400">• {rev.userLocation}</span>
                      {rev.verifiedBooking && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Verified Client
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Booking Strip */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white sticky bottom-0 py-3">
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'hi' ? 'परामर्श व सेवा फीस:' : 'Total Consultation Fee:'}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-navy">₹{pro.fee.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {lang === 'hi' ? 'टोकन मात्र ₹100' : 'Pay ₹100 Token Now'}
                </span>
              </div>
            </div>

            <button
              onClick={handleBookClick}
              id="profile-modal-book-cta"
              className="w-full sm:w-auto bg-primary hover:bg-navy text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{lang === 'hi' ? '₹100 टोकन देकर अपॉइंटमेंट बुक करें' : 'Book with ₹100 Token'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
