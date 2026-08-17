import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageSquare, CheckCheck, Clock, ExternalLink, RefreshCw, Smartphone, Send } from 'lucide-react';

export const WhatsAppDrawer: React.FC = () => {
  const { 
    isWhatsAppDrawerOpen, 
    setIsWhatsAppDrawerOpen, 
    whatsAppMessages,
    lang 
  } = useApp();

  if (!isWhatsAppDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in-50">
      <div className="w-full max-w-md bg-[#0a1b33] text-white h-full shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-300">
        
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#082B63] p-4 flex items-center justify-between border-b border-blue-900 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10B981] text-slate-900 flex items-center justify-center font-black text-sm">
              LC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">LegalCure.in Alerts</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                  Verified Meta Bot
                </span>
              </div>
              <div className="text-[11px] text-blue-200/80">WhatsApp Business Notification Channel</div>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-blue-900/60 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader info */}
        <div className="bg-blue-950/60 px-4 py-2 text-[11px] text-blue-300 border-b border-blue-900/50 flex items-center justify-between">
          <span>Simulation Feed (Real-Time Events)</span>
          <span className="text-emerald-400 font-bold">{whatsAppMessages.length} Messages Dispatched</span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]">
          {whatsAppMessages.length === 0 ? (
            <div className="text-center py-16 text-blue-300/70 text-xs">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40 text-emerald-400" />
              <p className="font-bold text-blue-200">No WhatsApp messages yet.</p>
              <p className="mt-1">Book an appointment or unlock a contact to see live automated notifications.</p>
            </div>
          ) : (
            whatsAppMessages.map((msg) => (
              <div 
                key={msg.id}
                className="bg-[#12284b] border border-blue-800/80 rounded-2xl rounded-tl-none p-4 shadow-lg text-xs space-y-2 relative group"
              >
                {/* Message Header */}
                <div className="flex items-center justify-between text-[11px] pb-2 border-b border-blue-800/60">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span>🟢 {msg.templateKey.replace(/_/g, ' ')}</span>
                  </span>
                  <span className="text-blue-300/70 text-[10px]">
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Recipient info */}
                <div className="text-[11px] text-blue-200/90 flex items-center gap-2">
                  <span className="font-semibold text-blue-300">To:</span>
                  <span className="bg-blue-900/60 px-2 py-0.5 rounded text-[10px] text-blue-100 font-mono">
                    {msg.recipientPhone}
                  </span>
                  <span className="text-gray-400 text-[10px]">({msg.recipientRole})</span>
                </div>

                {/* Body Text */}
                <div className="text-slate-100 font-sans leading-relaxed whitespace-pre-line text-xs bg-[#0b1c36] p-3 rounded-xl border border-blue-900">
                  {msg.messageBody}
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between text-[10px] text-blue-300/70 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Delivered & Read</span>
                  </span>
                  <span>Payload: {msg.bookingNumber || 'Lead Info'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Bar */}
        <div className="p-4 bg-[#082B63] border-t border-blue-900 text-center text-xs text-blue-200/80">
          Integrated with Official WhatsApp Cloud API (Bihar Gov Land Notification Rules)
        </div>

      </div>
    </div>
  );
};
