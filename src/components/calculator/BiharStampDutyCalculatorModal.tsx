import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { professionalService } from '../../services/professionalService';
import { X, Calculator, ShieldCheck, Info, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export const BiharStampDutyCalculatorModal: React.FC = () => {
  const { lang, isStampCalcOpen, setIsStampCalcOpen, updateFilter, setActiveView } = useApp();

  const [propertyValue, setPropertyValue] = useState<number>(2500000); // 25 Lakhs default
  const [gender, setGender] = useState<'male' | 'female' | 'joint'>('male');
  const [locationType, setLocationType] = useState<'urban' | 'rural'>('urban');
  const [transactionType, setTransactionType] = useState<'sale' | 'gift' | 'lease' | 'partition'>('sale');

  if (!isStampCalcOpen) return null;

  const result = professionalService.calculateBiharStampDuty(
    propertyValue,
    gender,
    locationType,
    transactionType
  );

  const handleFindDeedWriter = () => {
    setIsStampCalcOpen(false);
    updateFilter('category', 'Deed Writer');
    setActiveView('professionals');
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6"
        id="stamp-duty-modal"
      >
        {/* Close */}
        <button
          onClick={() => setIsStampCalcOpen(false)}
          className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Close calculator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-navy p-6 sm:p-7 text-white rounded-t-3xl border-b border-blue-900">
          <div className="flex items-center gap-2 mb-1 text-xs text-amber-300 font-bold">
            <Calculator className="w-4 h-4" />
            <span>{lang === 'hi' ? 'बिहार निबंधन व मद्यनिषेध विभाग नियम' : 'Bihar Registration & Stamp Dept Rules'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'hi' ? 'बिहार जमीन रजिस्ट्री व स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Duty & Registration Calculator'}
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            {lang === 'hi' 
              ? 'सर्किल रेट व जमीन मूल्य के आधार पर सरकारी स्टांप और निबंधन शुल्क की सटीक गणना करें।'
              : 'Calculate government stamp duty, registration fees, and female buyer discounts in Bihar.'}
          </p>
        </div>

        {/* Calculator Form */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Property Value Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                {lang === 'hi' ? 'जमीन / संपत्ति का मूल्य (₹ में)' : 'Property Valuation / Circle Rate Total (₹)'}
              </label>
              <span className="text-xs font-extrabold text-primary">
                ₹{propertyValue.toLocaleString('en-IN')}
              </span>
            </div>
            
            <input
              type="number"
              min={50000}
              step={50000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Math.max(10000, Number(e.target.value)))}
              className="w-full text-base font-extrabold p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary text-navy"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[500000, 1000000, 2500000, 5000000, 10000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setPropertyValue(amt)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                    propertyValue === amt 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(0)} Lakhs
                </button>
              ))}
            </div>
          </div>

          {/* Gender of Buyer / Concession */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'क्रेता (खरीदार) का प्रकार (महिला छूट)' : 'Buyer Category (Concession)'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  gender === 'male' 
                    ? 'border-primary bg-blue-50/70 text-navy shadow-xs' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>{lang === 'hi' ? 'पुरुष (Male)' : 'Male Buyer'}</span>
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">6% + 2%</span>
              </button>

              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  gender === 'female' 
                    ? 'border-primary bg-blue-50/70 text-navy shadow-xs' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="text-emerald-700">{lang === 'hi' ? 'महिला (Female)' : 'Female Buyer'}</span>
                <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">5.7% + 1.9% (Discount)</span>
              </button>

              <button
                type="button"
                onClick={() => setGender('joint')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  gender === 'joint' 
                    ? 'border-primary bg-blue-50/70 text-navy shadow-xs' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>{lang === 'hi' ? 'संयुक्त (Joint)' : 'Joint Buyer'}</span>
                <span className="block text-[10px] text-slate-400 font-normal mt-0.5">5.85% + 1.95%</span>
              </button>
            </div>
          </div>

          {/* Deed / Transaction Type */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'विलेख (दस्तावेज) का प्रकार' : 'Transaction / Deed Type'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sale', labelEn: 'Sale Deed (Kewala)', labelHi: 'केवाला (बिक्री पत्र)' },
                { id: 'gift', labelEn: 'Gift Deed (1% Exemption)', labelHi: 'दान पत्र (हिबानामा 1%)' },
                { id: 'partition', labelEn: 'Partition (Batwara)', labelHi: 'बंटवारानामा' },
                { id: 'lease', labelEn: 'Lease Agreement', labelHi: 'पट्टा / लीज' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTransactionType(t.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                    transactionType === t.id 
                      ? 'border-primary bg-navy text-white shadow-xs' 
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {lang === 'hi' ? t.labelHi : t.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Output Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'hi' ? 'शुल्क विवरण (Govt Fee Breakdown)' : 'Estimated Govt Registry Breakdown'}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-md">
                Bihar Rates
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>
                  {lang === 'hi' ? `स्टाम्प शुल्क (${result.stampDutyPercent}%):` : `Stamp Duty (${result.stampDutyPercent}%):`}
                </span>
                <span className="font-bold text-white text-sm">
                  ₹{result.stampDutyAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>
                  {lang === 'hi' ? `निबंधन शुल्क (${result.registrationFeePercent}%):` : `Registration Fee (${result.registrationFeePercent}%):`}
                </span>
                <span className="font-bold text-white text-sm">
                  ₹{result.registrationFeeAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>{lang === 'hi' ? 'ऑनलाइन स्कैनिंग व ई-चालान शुल्क:' : 'Online Processing & E-Challan Fee:'}</span>
                <span className="font-bold text-white">₹{result.processingFee}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-400 block">
                  {lang === 'hi' ? 'कुल अनुमानित सरकारी शुल्क:' : 'Total Estimated Govt Fee:'}
                </span>
                <span className="text-2xl font-black text-amber-400">
                  ₹{result.totalGovtFees.toLocaleString('en-IN')}
                </span>
              </div>

              {gender === 'female' && transactionType === 'sale' && (
                <div className="text-right text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 p-2 rounded-lg">
                  ✓ {lang === 'hi' ? 'महिला छूट लागू (0.4% बचत)' : 'Female Concession Applied'}
                </div>
              )}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 max-w-xs">
              {lang === 'hi' 
                ? '* यह राशि सरकारी कोष में जाती है। कातिब द्वारा सही केवाला मसौदा तैयार कराने के लिए विशेषज्ञ चुनें।'
                : '* Note: This is official govt revenue fee. Book a verified Katib to draft your deed accurately.'}
            </p>

            <button
              onClick={handleFindDeedWriter}
              className="w-full sm:w-auto bg-primary hover:bg-navy text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>{lang === 'hi' ? 'दस्तावेज लेखक (कातिब) खोजें' : 'Find Verified Deed Writer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
