import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  FileText, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  MapPin,
  ArrowRight
} from 'lucide-react';

export const KnowledgeCenterView: React.FC = () => {
  const { lang, setActiveView } = useApp();

  const [calcKatha, setCalcKatha] = useState<number>(2);
  const [laggiHand, setLaggiHand] = useState<number>(5.5); // Standard Laggi in Bihar (5.5 hands or 6 hands)

  // Calculations:
  // Laggi in feet = laggiHand * 1.5 feet (1 hand = 18 inches = 1.5 ft)
  // 1 Dhur = (Laggi in ft)^2 sq ft
  // 1 Katha = 20 Dhur
  // 1 Decimal = 435.6 sq ft
  const laggiInFeet = laggiHand * 1.5;
  const sqFtPerDhur = laggiInFeet * laggiInFeet;
  const sqFtPerKatha = sqFtPerDhur * 20;
  const totalSqFt = calcKatha * sqFtPerKatha;
  const totalDecimals = totalSqFt / 435.6;

  const terms = [
    {
      term: 'Kewala (केवाला / बैनामा)',
      descEn: 'The absolute Sale Deed executed between seller and buyer in Bihar, establishing transfer of ownership upon registration.',
      descHi: 'क्रेता और विक्रेता के बीच जमीन की स्थायी बिक्री का मुख्य कानूनी दस्तावेज (रजिस्ट्री पत्र)।'
    },
    {
      term: 'Jamabandi (जमाबंदी)',
      descEn: 'The official record-of-rights (RoR) ledger entry maintained at the Circle Office showing land ownership and revenue rent assessment.',
      descHi: 'अंचल कार्यालय (Circle Office) के रजिस्टर-2 में दर्ज जमीन का आधिकारिक राजस्व स्वामित्व रिकॉर्ड।'
    },
    {
      term: 'Dakhil Kharij (दाखिल खारिज / Mutation)',
      descEn: 'The administrative process of removing seller’s name from govt records and entering buyer’s name post-registry.',
      descHi: 'रजिस्ट्री के बाद सरकारी राजस्व रिकॉर्ड (जमाबंदी) में पुराने मालिक का नाम हटाकर नए मालिक का नाम दर्ज करने की प्रक्रिया।'
    },
    {
      term: 'Khata & Khesra (खाता एवं खेसरा)',
      descEn: 'Khata refers to the landholder’s title account number, and Khesra (Plot No.) refers to the specific physical plot on the village survey sheet.',
      descHi: 'खाता नंबर रैयत (मालिक) का खाता संख्या है, और खेसरा मौजा के नक्शे पर उस विशेष जमीन का प्लॉट नंबर होता है।'
    },
    {
      term: 'Chauhaddi (चौहद्दी)',
      descEn: 'The exact description of the four physical boundaries (North, South, East, West) identifying neighbors around the plot.',
      descHi: 'प्लॉट के चारों ओर (उत्तर, दक्षिण, पूरब, पश्चिम) के पड़ोसियों और सीमाओं का आधिकारिक विवरण।'
    },
    {
      term: 'Laggi (लग्गी / बांस की पैमाइश)',
      descEn: 'The regional measuring pole used by Bihar Amins. Varies by district from 5.5 hands (8.25 ft) to 6 hands (9 ft).',
      descHi: 'अमीन द्वारा नापी में प्रयुक्त बांस का पैमाना (साढ़े पांच हाथ, छह हाथ आदि), जिससे धूर और कट्ठे का क्षेत्रफल तय होता है।'
    }
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#082B63] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-100 mb-3">
          <BookOpen className="w-4 h-4 text-[#0B3D91]" />
          <span>{lang === 'hi' ? 'बिहार भूमि नियम व ज्ञान केंद्र' : 'Bihar Land Rules & Lexicon'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B63] tracking-tight">
          {lang === 'hi' ? 'बिहार जमीन शब्दावली एवं नापी कैलकुलेटर' : 'Bihar Land Lexicon & Area Converter'}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {lang === 'hi'
            ? 'केवाला, दाखिल-खारिज, खतियान एवं कट्ठा-डिसमिल नापी से जुड़े सभी महत्वपूर्ण नियम।'
            : 'Essential legal terms, registration checklists, and instant Katha-to-Decimal conversions.'}
        </p>
      </div>

      {/* Interactive Bihar Unit Converter Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Bihar Unit Converter (कट्ठा / डिसमिल)</span>
            </div>
            <h2 className="text-xl font-bold text-[#082B63] mt-1">
              {lang === 'hi' ? 'कट्ठा से डिसमिल एवं वर्गफीट रूपांतरण' : 'Katha to Decimal & Sq.Ft Standard Conversion'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Enter Area in Katha (कट्ठा):
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={calcKatha}
              onChange={(e) => setCalcKatha(parseFloat(e.target.value) || 0)}
              className="w-full text-base font-bold px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              District Laggi Size (लग्गी मानक):
            </label>
            <select
              value={laggiHand}
              onChange={(e) => setLaggiHand(parseFloat(e.target.value))}
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#082B63] bg-white cursor-pointer"
            >
              <option value="5.5">5.5 Hands (साढ़े 5 हाथ - 8.25 ft / पटना, मुंगेर)</option>
              <option value="6.0">6.0 Hands (6 हाथ - 9.00 ft / गया, शाहाबाद)</option>
              <option value="5.0">5.0 Hands (5 हाथ - 7.50 ft / तिरहुत, मुजफ्फरपुर)</option>
              <option value="6.5">6.5 Hands (साढ़े 6 हाथ - 9.75 ft / अंग, भागलपुर)</option>
            </select>
          </div>

          <div className="bg-[#F6F8FC] p-4 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <div className="text-[11px] text-gray-500 font-medium">Calculated Dimensions:</div>
            <div className="text-lg font-black text-[#082B63] mt-0.5">
              {totalDecimals.toFixed(2)} <span className="text-xs text-emerald-800 font-bold">Decimals (डिसमिल)</span>
            </div>
            <div className="text-xs text-gray-600 font-semibold mt-1">
              = {Math.round(totalSqFt).toLocaleString('en-IN')} Sq. Ft.
            </div>
          </div>
        </div>
      </div>

      {/* Lexicon Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#082B63] mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#0B3D91]" />
          <span>{lang === 'hi' ? 'आवश्यक बिहार राजस्व शब्दावली' : 'Key Bihar Land Terms & Meanings'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((t, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-blue-300 transition-all">
              <h3 className="text-sm font-bold text-[#082B63] mb-1.5">{t.term}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lang === 'hi' ? t.descHi : t.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Registry Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12">
        <h2 className="text-lg font-bold text-[#082B63] mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span>{lang === 'hi' ? 'जमीन रजिस्ट्री हेतु अनिवार्य चेकलिस्ट' : 'Sub-Registry Document Checklist'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Aadhaar Card & PAN Card (Buyer & Seller)</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Up-to-date Land Possession Certificate (LPC) / रसीद</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Khatiyan & Chain of Prior Deeds (30-Year Search)</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Draft Sale Deed (Kewala) prepared by Licensed Katib</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>e-Challan / e-Grass Stamp Duty Payment Slip</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Two local Witnesses with valid Identity proofs</span>
          </div>
        </div>
      </div>

      {/* Official Government Portals */}
      <div className="bg-[#082B63] text-white rounded-3xl p-6 sm:p-8">
        <h2 className="text-base font-bold text-white mb-2">
          Official Bihar Government Revenue Portals
        </h2>
        <p className="text-xs text-blue-200 mb-6">
          Direct links to check Jamabandi, online mutation status, and MVR circle rates:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="http://biharbhumi.bihar.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white">Bihar Bhumi Portal</div>
              <div className="text-[11px] text-blue-200">Online Mutation & Jamabandi</div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href="http://registration.bihar.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white">e-Nibandhan Bihar</div>
              <div className="text-[11px] text-blue-200">MVR Valuation & Token Booking</div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href="http://parimarjan.bihar.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white">Parimarjan Portal</div>
              <div className="text-[11px] text-blue-200">Digital Record Correction</div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>

    </div>
  );
};
