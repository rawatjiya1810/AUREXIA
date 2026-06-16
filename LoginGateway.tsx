/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import {
  ShieldCheck,
  Lock,
  Key,
  Fingerprint,
  Cpu,
  RefreshCw,
  Database,
  ArrowRight,
  Sparkles,
  Award,
  Globe,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { INITIAL_CREATORS, INITIAL_BRANDS } from "../data";

interface LoginGatewayProps {
  onLoginSuccess: (user: {
    type: "brand" | "creator";
    id: string;
    name: string;
    avatar: string;
    handle?: string;
    details?: string;
    trustScore?: number;
  }) => void;
  onCancel?: () => void;
}

export default function LoginGateway({ onLoginSuccess, onCancel }: LoginGatewayProps) {
  const [authMode, setAuthMode] = useState<"brand" | "creator" | "demo">("brand");
  
  // Brand Authentication fields
  const [brandIdInput, setBrandIdInput] = useState("brand_1"); // Default prefilled for convenience
  const [brandEmail, setBrandEmail] = useState("marketing@nike.in");
  const [brandApiKey, setBrandApiKey] = useState("ax_sk_live_de8a73919e48bc");
  
  // Creator Authentication fields
  const [creatorIdInput, setCreatorIdInput] = useState("creator_1");
  const [creatorDid, setCreatorDid] = useState("did:aurexia:poly:0x51cbf...e724");
  const [creatorPass, setCreatorPass] = useState("••••••••••••••••");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStepText, setActiveStepText] = useState("");

  // Simulated live security messages
  useEffect(() => {
    if (loading) {
      const messages = [
        "Initializing premium TLS handshake with Aurexia Nodes...",
        "Resolving zero-knowledge client cryptographic factors...",
        "Verifying Decentralized Identity (DID) document on Polygon ledger...",
        "Querying dynamic trust pools and fraud analytics threshold...",
        "Executing bi-directional signature consensus loop...",
        "Access token mapped successfully. Welcome to Aurexia OS."
      ];
      
      let step = 0;
      const interval = setInterval(() => {
        if (step < messages.length) {
          setLogs((p) => [...p, `[${new Date().toLocaleTimeString()}] ${messages[step]}`]);
          setActiveStepText(messages[step]);
          setProgress(((step + 1) / messages.length) * 100);
          step++;
        } else {
          clearInterval(interval);
        }
      }, 350);

      return () => clearInterval(interval);
    } else {
      setLogs([]);
      setProgress(0);
      setActiveStepText("");
    }
  }, [loading]);

  const handleBrandSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerSimulation(() => {
      // Find matching item in mockup brands
      const foundBrand = INITIAL_BRANDS.find(b => b.id === brandIdInput) || INITIAL_BRANDS[0];
      onLoginSuccess({
        type: "brand",
        id: foundBrand.id,
        name: foundBrand.name,
        avatar: foundBrand.logo || "⚡",
        details: `${foundBrand.industry} • Global Brand Node`,
        trustScore: foundBrand.reliabilityScore || 96
      });
    });
  };

  const handleCreatorSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerSimulation(() => {
      // Find matching creator
      const foundCreator = INITIAL_CREATORS.find(c => c.id === creatorIdInput) || INITIAL_CREATORS[0];
      onLoginSuccess({
        type: "creator",
        id: foundCreator.id,
        name: foundCreator.name,
        handle: foundCreator.handle,
        avatar: foundCreator.avatar,
        details: `${foundCreator.category} • Vetted Creative Node`,
        trustScore: foundCreator.trustScore.overall || 98
      });
    });
  };

  const handleQuickDemoLogin = (type: "brand" | "creator", id: string) => {
    if (type === "brand") {
      setBrandIdInput(id);
      setAuthMode("brand");
      const chosen = INITIAL_BRANDS.find(b => b.id === id) || INITIAL_BRANDS[0];
      setBrandEmail(`ops@${chosen.name.toLowerCase().replace(/\s+/g, "")}.com`);
      setBrandApiKey(`ax_sk_live_demo_${Math.random().toString(16).substr(2, 8)}`);
    } else {
      setCreatorIdInput(id);
      setAuthMode("creator");
      const chosen = INITIAL_CREATORS.find(c => c.id === id) || INITIAL_CREATORS[0];
      setCreatorDid(`did:aurexia:poly:0x${Math.random().toString(16).substr(2, 10)}`);
    }
    
    // Auto-authenticate for beautiful experience
    setLoading(true);
    setTimeout(() => {
      if (type === "brand") {
        const foundBrand = INITIAL_BRANDS.find(b => b.id === id) || INITIAL_BRANDS[0];
        onLoginSuccess({
          type: "brand",
          id: foundBrand.id,
          name: foundBrand.name,
          avatar: foundBrand.logo || "📱",
          details: `${foundBrand.industry} • Verified Client`,
          trustScore: foundBrand.reliabilityScore || 95
        });
        setLoading(false);
      } else {
        const foundCr = INITIAL_CREATORS.find(c => c.id === id) || INITIAL_CREATORS[0];
        onLoginSuccess({
          type: "creator",
          id: foundCr.id,
          name: foundCr.name,
          handle: foundCr.handle,
          avatar: foundCr.avatar,
          details: `${foundCr.category} • Vetted Creator Partner`,
          trustScore: foundCr.trustScore.overall || 96
        });
        setLoading(false);
      }
    }, 2200);
  };

  const triggerSimulation = (callback: () => void) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 2300);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-soft-warm-gray overflow-hidden shadow-luxury grid grid-cols-1 md:grid-cols-12" id="aurexia-secure-gateway-root">
      
      {/* LEFT COLUMN: HIGH-DENSITY LEDGER SYSTEM STATUS & TERMINAL */}
      <div className="md:col-span-5 bg-gradient-to-b from-[#2D3E33] to-[#1C1C1C] p-6 lg:p-8 text-white flex flex-col justify-between relative border-r border-soft-warm-gray">
        {/* Abstract vector background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#B5935B30_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded bg-[#B5935B] text-white flex items-center justify-center font-serif text-[13px] font-bold shadow-sm">
              🔑
            </span>
            <div>
              <h4 className="font-serif text-lg tracking-wider font-bold">AUREXIA OS</h4>
              <span className="text-[9px] font-mono tracking-widest text-[#B5935B] uppercase block">
                GATEWAY SECURE V.3.14
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B5935B] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>CRYPTOGRAPHIC PROTOCOLS</span>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Welcome back to Aurexia’s dynamic trust networks. To interact with escrow pipelines and direct smart discovery nodes, bind your identity key.
            </p>

            {/* Authenticity Metrics Box (High Density style guide fallback) */}
            <div className="bg-[#1C1C1C]/50 border border-white/10 rounded-xl p-4 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-gray-400">LEDGER STATUS</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-bold uppercase animate-pulse">Synced</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-300">
                <div className="p-2 bg-white/5 rounded border border-white/5">
                  <span className="text-[8px] text-gray-500 block uppercase">Consensus Rate</span>
                  <span className="font-bold text-gray-200">99.98%</span>
                </div>
                <div className="p-2 bg-white/5 rounded border border-white/5">
                  <span className="text-[8px] text-gray-500 block uppercase">Block Latency</span>
                  <span className="font-bold text-[#B5935B]">~1.4s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live system simulator console */}
        <div className="relative z-10 mt-8 pt-4 border-t border-white/10 space-y-3">
          <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block">ACTIVE SECURITY TELEMETRY</span>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-3 h-36 font-mono text-[9px] text-gray-300 overflow-y-auto space-y-1.5 flex flex-col justify-end">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">Waiting to start signature verification...</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-[#B5935B] animate-fade-in truncate leading-tight">
                  {log}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="relative z-10 pt-4 text-center">
          <span className="text-[9px] font-mono text-gray-500">
            Aurexia Zero-Knowledge Encryption • FIPS 140-3 Compliant
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE LOGIN INTERFACES */}
      <div className="md:col-span-7 p-6 lg:p-8 flex flex-col justify-between bg-[#FDFCF7]">
        
        {/* Header Tab Navigator */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-soft-warm-gray pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">Secure Credentials Portal</h3>
              <p className="text-xs text-gray-400 font-sans mt-0.5">Choose your verified node context for instant session routing</p>
            </div>
            {onCancel && (
              <button onClick={onCancel} className="text-xs text-gray-400 hover:text-charcoal font-semibold">
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#F7F5F0] p-1 rounded-lg border border-soft-warm-gray text-xs font-mono">
            <button
              onClick={() => { setAuthMode("brand"); setLogs([]); }}
              className={`py-2 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "brand" ? "bg-white text-[#1C1C1C] border border-soft-warm-gray shadow-sm" : "text-gray-500 hover:text-[#1C1C1C]"
              }`}
            >
              🏢 Brand
            </button>
            <button
              onClick={() => { setAuthMode("creator"); setLogs([]); }}
              className={`py-2 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "creator" ? "bg-white text-[#1C1C1C] border border-soft-warm-gray shadow-sm" : "text-gray-500 hover:text-[#1C1C1C]"
              }`}
            >
              💅 Creator
            </button>
            <button
              onClick={() => { setAuthMode("demo"); setLogs([]); }}
              className={`py-2 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "demo" ? "bg-white text-[#1E3E26] border border-[#2D3E33]/30 shadow-sm" : "text-[#B5935B] hover:text-[#1C1C1C]"
              }`}
            >
              🚀 Fast Demo
            </button>
          </div>
        </div>

        {/* LOADING STATE VIEW */}
        {loading ? (
          <div className="flex-1 py-16 flex flex-col justify-center items-center space-y-4 animate-fade-in font-sans text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-[#B5935B]/25 border-t-[#B5935B] animate-spin"></div>
              <span className="absolute inset-x-0 bottom-4 text-center font-serif font-bold text-[#B5935B] text-lg">A</span>
            </div>
            <div className="space-y-1 max-w-sm">
              <h4 className="font-serif text-lg font-bold text-[#1C1C1C]">Signing Ledger Transaction</h4>
              <p className="text-[11px] text-gray-500 font-mono italic animate-pulse">{activeStepText || "Compiling system variables..."}</p>
            </div>
            <div className="w-52 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#B5935B] transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        ) : (
          <div className="flex-1 py-6">
            
            {/* BRAND ACCOUNT SUBMISSION FORM */}
            {authMode === "brand" && (
              <form onSubmit={handleBrandSubmit} className="space-y-4 animate-fade-in font-sans">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1">Company Workspace Node</label>
                    <select
                      className="w-full px-3 py-2 text-xs rounded-lg border border-soft-warm-gray bg-white text-[#1C1C1C] focus:ring-1 focus:ring-gold focus:outline-none font-sans"
                      value={brandIdInput}
                      onChange={(e) => setBrandIdInput(e.target.value)}
                    >
                      {INITIAL_BRANDS.map((b) => (
                        <option key={b.id} value={b.id}>{b.name} (Global Account)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1">Authorized Administrator SSO Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. director@company.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-soft-warm-gray bg-[#FDFCF7]/50 text-[#1C1C1C] focus:ring-1 focus:ring-gold focus:outline-none"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1">Aurexia Workspace Private Key SK</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="ax_sk_live_..."
                        className="w-full pl-3 pr-10 py-2 text-xs rounded-lg border border-soft-warm-gray bg-[#FDFCF7]/50 text-[#1C1C1C] font-mono focus:ring-1 focus:ring-gold focus:outline-none"
                        value={brandApiKey}
                        onChange={(e) => setBrandApiKey(e.target.value)}
                      />
                      <Key className="absolute right-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1 bg-[#F7F5F0] px-2 py-1 rounded border border-soft-warm-gray">
                    <Fingerprint className="w-3.5 h-3.5 text-[#B5935B]" /> Prefilled Live Dev Credential
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1C1C] hover:bg-[#2D3E33] text-white text-[11px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Secure Sync & Sign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* CREATOR DID FORM */}
            {authMode === "creator" && (
              <form onSubmit={handleCreatorSubmit} className="space-y-4 animate-fade-in font-sans">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1">Select Vetted Creator Entity</label>
                    <select
                      className="w-full px-3 py-2 text-xs rounded-lg border border-soft-warm-gray bg-white text-[#1C1C1C] focus:ring-1 focus:ring-gold focus:outline-none font-sans"
                      value={creatorIdInput}
                      onChange={(e) => setCreatorIdInput(e.target.value)}
                    >
                      {INITIAL_CREATORS.map((c) => (
                        <option key={c.id} value={c.id}>{c.name} ({c.handle})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1">Decentralized Identifier (DID) URI Hash</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="did:aurexia:poly:0x..."
                        className="w-full pl-3 pr-10 py-2 text-xs rounded-lg border border-soft-warm-gray bg-[#FDFCF7]/50 text-[#1C1C1C] font-mono focus:ring-1 focus:ring-gold focus:outline-none"
                        value={creatorDid}
                        onChange={(e) => setCreatorDid(e.target.value)}
                      />
                      <Globe className="absolute right-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-2">Cryptographic Wallet Phrase or Private Signature File</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        className="w-full pl-3 pr-10 py-2 text-xs rounded-lg border border-soft-warm-gray bg-[#FDFCF7]/50 text-[#1C1C1C] focus:ring-1 focus:ring-gold focus:outline-none"
                        value={creatorPass}
                        onChange={(e) => setCreatorPass(e.target.value)}
                      />
                      <Lock className="absolute right-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1 bg-[#F7F5F0] px-2 py-1 rounded border border-soft-warm-gray">
                    <Fingerprint className="w-3.5 h-3.5 text-[#B5935B]" /> Biometrics Bound Authenticator
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1C1C] hover:bg-[#2D3E33] text-white text-[11px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Consensus Signature Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* QUICK ONE-CLICK FAST ACCESS DEMO SELECTION */}
            {authMode === "demo" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="p-3 bg-[#F7F5F0] rounded-lg border border-soft-warm-gray text-[11px] text-gray-600 leading-relaxed font-sans">
                  <strong>💡 Prototyping Portal:</strong> Skip formal ledger handshake. Click any verified profile below to load matching credentials on-the-fly.
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-2">Enterprise Brand Accounts</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INITIAL_BRANDS.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => handleQuickDemoLogin("brand", brand.id)}
                          className="p-3 border border-soft-warm-gray bg-white rounded-xl text-left hover:border-[#B5935B] hover:shadow-luxury transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex gap-2.5 items-center">
                            <span className="w-8 h-8 rounded bg-[#F7F5F0] border border-soft-warm-gray flex items-center justify-center text-sm">{brand.logo}</span>
                            <div>
                              <h5 className="font-serif font-bold text-xs text-[#1C1C1C]">{brand.name}</h5>
                              <span className="text-[9px] font-mono text-gray-400 block">{brand.industry}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-[#2D3E33] hidden group-hover:inline font-mono font-bold animate-pulse">Connect →</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-2">Elite Creator Nodes</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INITIAL_CREATORS.slice(0, 4).map((cr) => (
                        <button
                          key={cr.id}
                          onClick={() => handleQuickDemoLogin("creator", cr.id)}
                          className="p-3 border border-soft-warm-gray bg-white rounded-xl text-left hover:border-[#B5935B] hover:shadow-luxury transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex gap-2.5 items-center">
                            <img src={cr.avatar} alt={cr.name} className="w-8 h-8 rounded-full object-cover border border-soft-warm-gray" />
                            <div>
                              <h5 className="font-serif font-bold text-xs text-[#1C1C1C]">{cr.name}</h5>
                              <span className="text-[9px] font-mono text-gray-400 block">{cr.handle}</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-[#2D3E33] hidden group-hover:inline font-mono font-bold animate-pulse">Assign →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Dynamic Tips Ticker footer */}
        <div className="border-t border-soft-warm-gray pt-4 flex justify-between items-center text-[10px] text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Gateway Engine: Live on Peer Node #321</span>
          </div>
          <span className="font-mono">SSL Secure v3.1</span>
        </div>

      </div>
    </div>
  );
}
