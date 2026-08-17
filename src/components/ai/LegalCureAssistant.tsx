import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, X, Send, Sparkles, HelpCircle, ChevronUp, ChevronDown, 
  CheckCircle2, ArrowRight, Calculator, FileText, Scale
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  chips?: string[];
  actionLink?: string;
  timestamp: string;
}

export const LegalCureAssistant: React.FC = () => {
  const { lang, updateFilter, setActiveView, setIsStampCalcOpen, setIsHelpMeChooseOpen } = useApp();
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: lang === 'hi' 
        ? 'नमस्ते! मैं लीगलक्योर का बिहार भूमि सहायक हूँ। आप जमीन रजिस्ट्री (केवाला), दाखिल-खारिज (Mutation), खतियान या अमीन नापी के बारे में कुछ भी पूछ सकते हैं।'
        : 'Hello! I am your LegalCure Bihar Land Assistant. Ask me about Sale Deeds (Kewala), Dakhil Kharij, Khatian records, or land measurements in Bihar.',
      chips: [
        'How to book a Katib for ₹100?',
        'Documents required for Registry',
        'What is Dakhil Kharij?',
        'Land units (Katha to Decimal)',
        'Calculate Bihar Stamp Duty'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleChipClick = (chipText: string) => {
    handleSendQuery(chipText);
  };

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // Simulate smart Bihar revenue assistant responses
    setTimeout(() => {
      let replyText = '';
      let replyChips: string[] | undefined = undefined;
      const lower = textToSend.toLowerCase();

      if (lower.includes('how to book') || lower.includes('₹100') || lower.includes('token') || lower.includes('टोकन')) {
        replyText = lang === 'hi'
          ? 'लीगलक्योर पर बुकिंग बेहद आसान है:\n1. अपनी आवश्यकता अनुसार कातिब, वकील या अमीन चुनें।\n2. अपनी पसंदीदा तारीख और समय स्लॉट चुनें।\n3. ₹100 टोकन देकर स्लॉट सुरक्षित करें।\n4. यह ₹100 टोकन आपके अंतिम बिल में पूरी तरह घट जाएगा।'
          : 'Booking on LegalCure is very simple:\n1. Choose your Deed Writer, Lawyer, or Amin.\n2. Pick your preferred appointment date and office slot.\n3. Pay a ₹100 platform token to lock the slot.\n4. The ₹100 is 100% adjusted against your final office consultation bill.';
        replyChips = ['Find Verified Pros', 'Calculate Stamp Duty'];
      } else if (lower.includes('document') || lower.includes('दस्तावेज') || lower.includes('kewala') || lower.includes('केवाला')) {
        replyText = lang === 'hi'
          ? 'बिहार में जमीन रजिस्ट्री के लिए मुख्य दस्तावेज:\n• जमीन की पुरानी रजिस्ट्री (केवाला) या खतियान नकल\n• चालू वित्तीय वर्ष की लगान रसीद (ऑनलाइन जमाबंदी)\n• क्रेता व विक्रेता का आधार कार्ड व पैन कार्ड\n• विक्रेता का LPC (भू-स्वामित्व प्रमाण पत्र)\n• 2 पासपोर्ट साइज फोटो व 2 गवाहों के आधार कार्ड'
          : 'Mandatory documents for Land Registry in Bihar:\n• Previous registered Sale Deed (Kewala) or Khatian copy\n• Current financial year land revenue (Lagan) receipt\n• Aadhaar Card & PAN Card of Buyer and Seller\n• LPC (Land Possession Certificate) of Seller\n• 2 Passport photos and 2 witnesses with valid Govt IDs.';
        replyChips = ['Book a Deed Writer', 'Check Jamabandi Online'];
      } else if (lower.includes('dakhil') || lower.includes('दाखिल') || lower.includes('mutation')) {
        replyText = lang === 'hi'
          ? 'दाखिल खारिज (Mutation):\nरजिस्ट्री (केवाला) के बाद सरकारी रिकॉर्ड (Register-II) में पुराने मालिक का नाम हटाकर नए खरीदार का नाम दर्ज करने की प्रक्रिया को दाखिल-खारिज कहते हैं। यदि अंचल अधिकारी (CO) द्वारा आपत्ति लगाई जाए, तो DCLR कोर्ट में अपील की जाती है।'
          : 'Dakhil Kharij (Mutation) transfers the land record entry from the seller to the buyer in the Bihar Revenue Register-II. If the Circle Officer raises an objection, our property lawyers handle the appeal before the DCLR.';
        replyChips = ['Find Property Lawyers', 'Help Me Choose'];
      } else if (lower.includes('katha') || lower.includes('decimal') || lower.includes('dhur') || lower.includes('नापी')) {
        replyText = lang === 'hi'
          ? 'बिहार में जमीन नापी की मुख्य इकाइयां:\n• 1 बीघा = 20 कट्ठा (~27,200 वर्ग फीट / 62.5 डिसमिल)\n• 1 कट्ठा = 20 धूर (~1,361 वर्ग फीट / 3.125 डिसमिल)\n• 1 डिसमिल = 435.6 वर्ग फीट\nसटीक पैमाइश व हदबंदी के लिए हमारे प्रमाणित अमीन को बुक करें।'
          : 'Standard Bihar Land Measurement Units:\n• 1 Bigha = 20 Katha (~27,200 sq.ft / 62.5 Decimal)\n• 1 Katha = 20 Dhur (~1,361 sq.ft / 3.125 Decimal)\n• 1 Decimal = 435.6 sq.ft\nBook a certified Amin for total station / chain survey.';
        replyChips = ['Find Amin Surveyors', 'Calculate Stamp Duty'];
      } else if (lower.includes('stamp') || lower.includes('duty') || lower.includes('फीस') || lower.includes('calculator')) {
        replyText = lang === 'hi'
          ? 'बिहार रजिस्ट्री शुल्क नियम:\n• पुरुष क्रेता: 6% स्टांप + 2% निबंधन शुल्क = कुल 8%\n• महिला क्रेता: 5.7% स्टांप + 1.9% निबंधन शुल्क = कुल 7.6% (0.4% छूट)\n• रक्त संबंध में दान पत्र (Gift Deed): मात्र 1% स्टांप + 1% निबंधन शुल्क'
          : 'Bihar Registration Rates:\n• Male Buyer: 6.0% Stamp + 2.0% Registration = 8.0%\n• Female Buyer: 5.7% Stamp + 1.9% Registration = 7.6% (Special discount)\n• Gift Deed to blood relation: 1.0% Stamp + 1.0% Reg fee.';
        replyChips = ['Open Stamp Duty Calculator', 'Find Deed Writer'];
      } else {
        replyText = lang === 'hi'
          ? `आपके प्रश्न "${textToSend}" के लिए: बिहार के रजिस्ट्री कार्यालयों में केवाला, जमाबंदी सुधार या जमीन नापी के लिए आप सीधे प्रमाणित कातिब या वकील से संपर्क कर सकते हैं।`
          : `Regarding "${textToSend}": In Bihar land and registry matters, our verified Deed Writers (Katib), Lawyers, and Amin Surveyors are available with instant ₹100 token booking.`;
        replyChips = ['Find Deed Writer', 'Find Lawyer', 'Help Me Choose'];
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        chips: replyChips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleChipAction = (chip: string) => {
    if (chip === 'Find Verified Pros' || chip === 'Find Deed Writer') {
      updateFilter('category', 'Deed Writer');
      setActiveView('professionals');
    } else if (chip === 'Find Property Lawyers' || chip === 'Find Lawyer') {
      updateFilter('category', 'Lawyer');
      setActiveView('professionals');
    } else if (chip === 'Find Amin Surveyors') {
      updateFilter('category', 'Amin / Land Surveyor');
      setActiveView('professionals');
    } else if (chip.includes('Stamp Duty') || chip.includes('Calculator')) {
      setIsStampCalcOpen(true);
    } else if (chip.includes('Help Me Choose')) {
      setIsHelpMeChooseOpen(true);
    } else {
      handleSendQuery(chip);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-navy hover:bg-primary text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-200 border-2 border-blue-400/40 hover:scale-105 group active:scale-95"
          id="btn-ai-assistant-toggle"
          aria-label="Open LegalCure Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-amber-300">
            <Bot className="w-5 h-5" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wide">LegalCure AI</span>
            <span className="text-[10px] text-blue-200">{lang === 'hi' ? 'बिहार भूमि सहायक' : 'Bihar Land Assistant'}</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />
        </button>
      )}

      {/* Assistant Chat Window */}
      {isOpen && (
        <div 
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[92vw] sm:w-96 max-h-[550px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          id="legalcure-assistant-window"
        >
          {/* Header */}
          <div className="bg-navy p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-amber-300 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">LegalCure Assistant</h3>
                <span className="text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {lang === 'hi' ? 'बिहार रजिस्ट्री व भूमि सहायक' : 'Bihar Land & Registry Guide'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-full"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200/90 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {m.text}
                </div>

                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>

                {/* Pre-defined Chips (Requirement #8) */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipAction(chip)}
                        className="text-[11px] bg-blue-50 hover:bg-blue-100 text-primary border border-blue-200/80 px-2.5 py-1 rounded-full font-semibold transition-colors text-left"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-400 text-xs p-2">
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'जमीन, केवाला या रजिस्ट्री फीस पूछें...' : 'Ask about registry, deeds, amin...'}
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="bg-primary hover:bg-navy disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
