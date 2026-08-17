import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, ArrowRight, CheckCircle2, FileText, Scale, Compass, Stamp, FileCheck, RotateCcw } from 'lucide-react';
import { ProfessionalCategory } from '../../types';

export const HelpMeChooseModal: React.FC = () => {
  const { lang, isHelpMeChooseOpen, setIsHelpMeChooseOpen, updateFilter, setActiveView } = useApp();

  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [recommendedCategory, setRecommendedCategory] = useState<{
    cat: ProfessionalCategory;
    title: string;
    reason: string;
    icon: any;
  } | null>(null);

  if (!isHelpMeChooseOpen) return null;

  const goals = [
    {
      id: 'buy_land',
      titleEn: '1. Buying New Land / Flat (रजिस्ट्री कराना है)',
      titleHi: '1. नई जमीन या मकान खरीद रहे हैं (रजिस्ट्री/केवाला)',
      descEn: 'Drafting sale deed (Kewala), title clearance, circle rate calculation, and Registry Office execution.'
    },
    {
      id: 'dispute_mutation',
      titleEn: '2. Land Dispute or Dakhil Kharij Issue (दाखिल खारिज / विवाद)',
      titleHi: '2. दाखिल खारिज रद्द होना, जमीन विवाद या नोटिस',
      descEn: 'Handling Circle Officer (CO) rejections, DCLR appeals, partition disputes, or fraud deed cancellation.'
    },
    {
      id: 'measurement_boundary',
      titleEn: '3. Land Measurement / Boundary (जमीन नापी व हदबंदी)',
      titleHi: '3. जमीन की नापी (पैमाइश), चौहद्दी व पिलर गाड़ना',
      descEn: 'Measuring area in Katha/Dhur/Decimal with Gunter chain/ETS, resolving border clashes with neighbors.'
    },
    {
      id: 'family_transfer_gift',
      titleEn: '4. Family Gift or Partition (दान पत्र / पारिवारिक बंटवारा)',
      titleHi: '4. पारिवारिक बंटवारा, वसीयत या दान पत्र (हिबानामा)',
      descEn: 'Transferring ancestral land between siblings, sons/daughters with official Bihar stamp duty exemptions.'
    },
    {
      id: 'check_records',
      titleEn: '5. Verifying Govt Records (जमाबंदी व खतियान जांच)',
      titleHi: '5. जमीन खरीदने से पहले ऑनलाइन जमाबंदी व खतियान जांच',
      descEn: 'Checking Register-II, Lagan receipts, and verifying if the seller is legally authorized to sell.'
    }
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    
    if (goalId === 'buy_land') {
      setRecommendedCategory({
        cat: 'Deed Writer',
        title: lang === 'hi' ? 'दस्तावेज लेखक / कातिब (Deed Writer)' : 'Licensed Deed Writer (Katib)',
        reason: lang === 'hi'
          ? 'रजिस्ट्री ऑफिस में केवाला (Sale Deed) का आधिकारिक मसौदा तैयार करने और रजिस्ट्री टोकन के लिए कातिब सर्वोत्तम हैं।'
          : 'A licensed Deed Writer drafts the official Sale Deed (Kewala), matches boundary (Chauhaddi), and files registration at the Sub-Registry office.',
        icon: FileText
      });
    } else if (goalId === 'dispute_mutation') {
      setRecommendedCategory({
        cat: 'Lawyer',
        title: lang === 'hi' ? 'जमीन व राजस्व अधिवक्ता (Property Lawyer)' : 'Property Lawyer / Advocate',
        reason: lang === 'hi'
          ? 'दाखिल खारिज अस्वीकार होने पर DCLR अपील या सिविल कोर्ट में स्थगन (Stay) के लिए अनुभवी वकील अनिवार्य हैं।'
          : 'For mutation rejections, DCLR tribunal appeals, partition suits, and legal notices, an advocate is strictly required.',
        icon: Scale
      });
    } else if (goalId === 'measurement_boundary') {
      setRecommendedCategory({
        cat: 'Amin / Land Surveyor',
        title: lang === 'hi' ? 'सरकारी प्रशिक्षित अमीन (Amin Surveyor)' : 'Amin / Land Surveyor',
        reason: lang === 'hi'
          ? 'जरीब (चेन) और इलेक्ट्रॉनिक टोटल स्टेशन से कट्ठा/धूर में सटीक पैमाइश व हदबंदी पिलर के लिए अमीन आवश्यक हैं।'
          : 'An Amin accurately measures the plot in Katha, Dhur, and Decimal using Cadastral village maps and fixes boundary pillars.',
        icon: Compass
      });
    } else if (goalId === 'family_transfer_gift') {
      setRecommendedCategory({
        cat: 'Deed Writer',
        title: lang === 'hi' ? 'दस्तावेज लेखक (Gift & Partition Specialist)' : 'Deed Writer (Gift & Batwara)',
        reason: lang === 'hi'
          ? 'दान पत्र (हिबानामा) में मात्र 1% स्टांप ड्यूटी का लाभ लेने व बंटवारानामा तैयार करने के लिए कातिब चाहिए।'
          : 'Deed Writers specialize in drafting Gift Deeds (Hibanama) to claim 1% concessional stamp duty for blood relations.',
        icon: Stamp
      });
    } else if (goalId === 'check_records') {
      setRecommendedCategory({
        cat: 'Document Checker',
        title: lang === 'hi' ? 'जमीन दस्तावेज व दाखिल खारिज परीक्षक' : 'Mutation & Khatian Auditor',
        reason: lang === 'hi'
          ? 'बिहार भूमि पोर्टल पर ऑनलाइन जमाबंदी, लगान रसीद और खतियान रिकॉर्ड की निष्पक्ष जांच के लिए।'
          : 'Audits Bihar Bhumi portal records, Register-II, and seller title validity before you make any payment.',
        icon: FileCheck
      });
    }
  };

  const handleApplyRecommendation = () => {
    if (!recommendedCategory) return;
    updateFilter('category', recommendedCategory.cat);
    setIsHelpMeChooseOpen(false);
    setActiveView('professionals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedGoal('');
    setRecommendedCategory(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6"
        id="help-me-choose-modal"
      >
        {/* Close */}
        <button
          onClick={() => setIsHelpMeChooseOpen(false)}
          className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Close wizard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-navy p-6 sm:p-7 text-white rounded-t-3xl border-b border-blue-900">
          <div className="flex items-center gap-2 mb-1 text-xs text-amber-300 font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'hi' ? '20 सेकंड में सही विशेषज्ञ चुनें' : '20-Second Decision Tree'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'hi' ? 'आपको किस पेशेवर की आवश्यकता है?' : 'Which Professional Do You Need?'}
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            {lang === 'hi'
              ? 'अपनी जमीन की स्थिति चुनें और तुरंत जानें कि कातिब, वकील या अमीन में से कौन सबसे उपयुक्त है।'
              : 'Select your property situation to find whether you need a Katib, Lawyer, Amin, or Notary.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {!recommendedCategory ? (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                {lang === 'hi' ? 'अपनी वर्तमान स्थिति या आवश्यकता चुनें:' : 'Select Your Current Property Need:'}
              </label>

              {goals.map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleGoalSelect(g.id)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-primary/50 hover:bg-blue-50/50 cursor-pointer transition-all duration-150 flex items-center justify-between group shadow-2xs"
                >
                  <div className="space-y-1 pr-3">
                    <div className="text-xs sm:text-sm font-bold text-navy group-hover:text-primary transition-colors">
                      {lang === 'hi' ? g.titleHi : g.titleEn}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {g.descEn}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <recommendedCategory.icon className="w-7 h-7" />
                </div>

                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                  {lang === 'hi' ? 'हमारी सिफारिश' : 'Recommended Professional'}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-black text-navy mt-1">
                  {recommendedCategory.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed max-w-md mx-auto">
                  {recommendedCategory.reason}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'दूसरा विकल्प जांचें' : 'Choose Again'}</span>
                </button>

                <button
                  onClick={handleApplyRecommendation}
                  className="w-full sm:flex-1 bg-primary hover:bg-navy text-white text-xs sm:text-sm font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'hi' ? `सत्यापित ${recommendedCategory.cat} देखें` : `Find Verified ${recommendedCategory.cat}`}</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
