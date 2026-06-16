/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from "react";
import { Message, Creator, Brand } from "../types";
import { Send, Sparkles, Languages, Check, RefreshCcw, FileText, Bot, Compass } from "lucide-react";
import { INITIAL_CREATORS, INITIAL_BRANDS } from "../data";

interface MessagingCenterProps {
  initialCreatorId?: string;
}

export default function MessagingCenterView({ initialCreatorId }: MessagingCenterProps) {
  const [selectedCreator, setSelectedCreator] = useState<Creator>(
    INITIAL_CREATORS.find(c => c.id === initialCreatorId) || INITIAL_CREATORS[0]
  );
  
  const [brand, setBrand] = useState<Brand>(INITIAL_BRANDS[0]);
  const [typedMessage, setTypedMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Default initial message log
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      senderId: brand.id,
      senderName: brand.name,
      senderType: "brand",
      text: {
        original: "Hello Sarah, we're highly impressed by your recent VOGUE awards. We want you to headline our Nike Air Max launch campaign in India! Can you share your preferred deliverables timelines?",
        language: "english"
      },
      timestamp: "10:30 AM"
    },
    {
      id: "msg_2",
      senderId: selectedCreator.id,
      senderName: selectedCreator.name,
      senderType: "creator",
      text: {
        original: "नमस्ते! नाइके टीम के साथ काम करने में मुझे बेहद खुशी होगी। मैं आमतौर पर दो रील और एक इमेज कैरोसेल के प्रारूप में काम करती हूँ।",
        translated: "Hello! I would be absolutely thrilled to work with the Nike team. I usually work in a format of two Reels and one image Carousel.",
        language: "hindi"
      },
      timestamp: "10:35 AM"
    },
    {
      id: "msg_3",
      senderId: "system",
      senderName: "AUREXIA TRUST ORACLE",
      senderType: "system",
      text: {
        original: "🛡️ Integrity System checked and approved mutual compliance. Mutual trust rating stands at solid 98/100."
      },
      timestamp: "10:36 AM"
    }
  ]);

  const [aiResponseStatus, setAiResponseStatus] = useState<string | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg: Message = {
      id: "msg_" + Date.now(),
      senderId: brand.id,
      senderName: brand.name,
      senderType: "brand",
      text: {
        original: typedMessage,
        language: "english"
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setTypedMessage("");

    // Simulate smart reply timeline
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: "msg_reply_" + Date.now(),
          senderId: selectedCreator.id,
          senderName: selectedCreator.name,
          senderType: "creator",
          text: {
            original: "एकदम सही, मैं अनुबंध के लिए तैयार हूँ। कृपया मुख्य विवरण और भुगतान की शर्तें भेजें।",
            translated: "Absolutely perfect, I am ready for the contract. Please dispatch the key deliverables check sheets and escrow details.",
            language: "hindi"
          },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  // AI Copilot functions available on click
  const triggerAICopilot = (action: "summarize" | "contract" | "translate") => {
    setAiResponseStatus("Processing requested task...");
    
    setTimeout(() => {
      if (action === "summarize") {
        const summaryMsg: Message = {
          id: "msg_ai_" + Date.now(),
          senderId: "ai_bot",
          senderName: "AUREXIA COPMIND COPILOT",
          senderType: "system",
          text: {
            original: "🧠 COGNITIVE SUMMARY: Brand (Nike) aims to launch Air Max in India with Creator (Sarah Kapoor). Creator agreed, proposing 2 Reels + 1 IG Carousel deliverables format. Next suggested step: Trigger contract draft."
          },
          timestamp: "AUREXIA GENERATED"
        };
        setMessages(prev => [...prev, summaryMsg]);
      } else if (action === "contract") {
        const contractMsg: Message = {
          id: "msg_ai_" + Date.now(),
          senderId: "ai_bot",
          senderName: "CONTRACT WRITING AUTOMATION",
          senderType: "system",
          text: {
            original: "⚡ SMART LEASE BRIEF MINTED:\n• Parties: Nike India & Sarah Kapoor\n• Campaign: Air Max Infinity\n• Deliverables: 2 IG Reels + 1 Story Carousel\n• Budget Escrow: ₹20,00,000 (INR 20 L)\n• Milestone releases: 50% on approval of Reel #1, 50% on campaign closure audit."
          },
          timestamp: "DRAFT ATTACHED",
          attachment: {
            type: "contract",
            name: "air_max_infinity_draft.json",
            status: "unsigned"
          }
        };
        setMessages(prev => [...prev, contractMsg]);
      } else if (action === "translate") {
        // Force translation displays for Hindi
        setMessages(prev =>
          prev.map(m => {
            if (m.text.language === "hindi" && !m.text.translated) {
              return {
                ...m,
                text: {
                  ...m.text,
                  translated: "Hello! I would be absolutely thrilled to work with the Nike team."
                }
              };
            }
            return m;
          })
        );
      }
      setAiResponseStatus(null);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[520px] bg-white rounded-xl border border-soft-warm-gray overflow-hidden shadow-sm" id="messaging-center-view">
      {/* Left sidebar: Active Creators in negotiation */}
      <div className="lg:col-span-4 border-r border-soft-warm-gray flex flex-col bg-warm-ivory/10 h-full">
        <div className="p-3 border-b border-soft-warm-gray">
          <h3 className="font-serif text-sm font-bold text-charcoal">Negotiation Rooms</h3>
          <p className="text-[9px] text-gray-400 font-mono tracking-wider mt-0.5 uppercase">Ecosystem Inboxes</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-soft-cream">
          {INITIAL_CREATORS.map((c) => {
            const isSelected = selectedCreator.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCreator(c)}
                className={`w-full p-3 flex gap-2.5 text-left transition-colors cursor-pointer ${
                  isSelected ? "bg-soft-cream/60 font-bold" : "hover:bg-soft-cream/25"
                }`}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-8 h-8 rounded object-cover border border-soft-warm-gray"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-sans font-bold text-charcoal text-[11px] truncate">{c.name}</h4>
                    <span className="text-[8px] font-mono text-[#1C3E24] font-bold">{c.trustScore.overall}</span>
                  </div>
                  <span className="text-[9px] text-gray-500 truncate block">{c.handle}</span>
                  <span className="inline-block mt-1 text-[8px] font-mono text-gray-400 bg-white border border-soft-warm-gray px-1 py-0.2 rounded font-bold">
                    {c.availabilityStatus}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right chat window & AI tools */}
      <div className="lg:col-span-8 flex flex-col justify-between h-full relative">
        {/* Chat top info */}
        <div className="p-3 border-b border-soft-warm-gray bg-warm-ivory/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={selectedCreator.avatar}
              alt={selectedCreator.name}
              className="w-8 h-8 rounded object-cover border border-soft-warm-gray"
            />
            <div>
              <h4 className="font-serif text-[13px] font-bold text-charcoal leading-none">{selectedCreator.name}</h4>
              <span className="text-[9px] text-gray-400 font-mono block mt-0.5 animate-none">Multi-lingual Hindi/Punjabi context active</span>
            </div>
          </div>

          <div className="flex gap-1.5">
            {/* Translation indicator bar */}
            <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
              <Languages className="w-2.5 h-2.5 text-gold" /> Auto-Translation Online
            </span>
          </div>
        </div>

        {/* AI Action Command Bar (Every major screen has an AI Copilot) */}
        <div className="bg-[#FAF8F5] py-1.5 px-3 border-b border-soft-warm-gray text-[11px] flex flex-wrap gap-1.5 items-center justify-between">
          <span className="font-mono text-[8px] font-bold text-charcoal flex items-center gap-1">
            <Bot className="w-3 h-3 text-gold" /> AI COPILOT:
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => triggerAICopilot("summarize")}
              className="bg-white hover:bg-[#FAF8F5] px-2 py-0.5 rounded border border-soft-warm-gray font-mono text-[8px] text-charcoal flex items-center gap-0.5 hover:border-gold transition-colors font-bold cursor-pointer"
            >
              <Sparkles className="w-2 h-2 text-gold" /> Summarize
            </button>
            <button
              onClick={() => triggerAICopilot("contract")}
              className="bg-white hover:bg-[#FAF8F5] px-2 py-0.5 rounded border border-soft-warm-gray font-mono text-[8px] text-charcoal flex items-center gap-0.5 hover:border-gold transition-colors font-bold cursor-pointer"
            >
              <FileText className="w-2 h-2 text-gold" /> Draft Lease
            </button>
            <button
              onClick={() => triggerAICopilot("translate")}
              className="bg-white hover:bg-[#FAF8F5] px-2 py-0.5 rounded border border-soft-warm-gray font-mono text-[8px] text-charcoal flex items-center gap-0.5 hover:border-gold transition-colors font-bold cursor-pointer"
            >
              <Languages className="w-2 h-2 text-gold" /> Trans-Translate
            </button>
          </div>
        </div>

        {/* Messages list container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-warm-ivory/10">
          {messages.map((m) => {
            const isSystem = m.senderType === "system";
            const isSelf = m.senderId === brand.id;

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isSystem ? "items-center" : isSelf ? "items-end" : "items-start"}`}
              >
                {/* System notification */}
                {isSystem ? (
                  <div className="bg-soft-cream/85 border border-[#DACFC2] text-charcoal p-2.5 rounded-lg text-center font-mono text-[9px] max-w-md shadow-sm">
                    {m.text.original}
                    {m.attachment && (
                      <div className="mt-2 bg-white p-1.5 rounded border border-soft-warm-gray text-left flex items-center justify-between">
                        <span className="text-[9.5px] text-gray-500 font-sans flex items-center gap-1 font-bold">
                          📄 {m.attachment.name}
                        </span>
                        <span className="text-[8px] bg-amber-50 text-amber-800 border border-amber-200 px-1 py-0.2 rounded font-mono font-bold">
                          {m.attachment.status}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-md">
                    {/* Speaker tag */}
                    <span className="text-[8px] text-gray-400 font-mono mb-0.5 block">
                      {m.senderName} • {m.timestamp}
                    </span>

                    <div
                      className={`p-2.5 rounded-lg border relative text-[11px] ${
                        isSelf
                          ? "bg-charcoal text-white border-charcoal rounded-tr-none"
                          : "bg-white text-charcoal border-soft-warm-gray rounded-tl-none shadow-sm"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{m.text.original}</p>

                      {/* Multilingual Translation sub-card */}
                      {m.text.translated && (
                        <div className="mt-1.5 pt-1.5 border-t border-soft-warm-gray/40 text-[9.5px] text-[#A68042] font-mono leading-relaxed bg-[#FAF8F5]/30 p-1 rounded">
                          <div className="text-[8px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                            AUREXIA TRANSLATION
                          </div>
                          "{m.text.translated}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {aiResponseStatus && (
            <div className="text-center font-mono text-[10px] text-gold animate-pulse italic">
              {aiResponseStatus}
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Message Input submission bar */}
        <div className="p-3 bg-white border-t border-soft-warm-gray">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              required
              className="flex-1 px-3 py-1.5 rounded border border-soft-warm-gray bg-warm-ivory/5 text-xs focus:outline-none focus:border-gold placeholder:text-gray-400"
              placeholder="Draft response..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-charcoal text-white hover:bg-[#1E1E1E] transition-all px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1 shrink-0"
            >
              <Send className="w-3 h-3" /> TransmitMsg
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
