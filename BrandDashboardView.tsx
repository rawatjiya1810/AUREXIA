/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { INITIAL_CREATORS, INITIAL_CAMPAIGNS } from "../data";
import { Creator, CampaignOpportunity, CreatorCategory, Platform } from "../types";
import {
  Search,
  MapPin,
  Plus,
  ArrowUpRight,
  Bell,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Cpu,
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from "lucide-react";

interface BrandDashboardProps {
  onSendMessage: (creatorId: string) => void;
  onSelectCreator: (creator: Creator) => void;
}

interface RiskAnomaly {
  id: string;
  creatorId: string;
  creatorName: string;
  handle: string;
  type: "Engagement Spike" | "Unusual Follower Growth" | "Audience Shift" | "Velocity Guard";
  severity: "low" | "medium" | "critical";
  metric: string;
  timestamp: string;
  details: string;
  vetted: boolean;
}

const INITIAL_ANOMALIES: RiskAnomaly[] = [
  {
    id: "risk_1",
    creatorId: "creator_1",
    creatorName: "Sarah Kapoor",
    handle: "@sarah.kapoor",
    type: "Engagement Spike",
    severity: "low",
    metric: "+14.8% spike",
    timestamp: "2 mins ago",
    details: "Unusual micro-viral traction identified on Instagram video discussing sustainable cashmere. AI nodes scanned follower logs to verify real engagement.",
    vetted: true,
  },
  {
    id: "risk_2",
    creatorId: "creator_2",
    creatorName: "Marcus Chen",
    handle: "@marcus.tech.ai",
    type: "Unusual Follower Growth",
    severity: "medium",
    metric: "+42,000 in 24h",
    timestamp: "12 mins ago",
    details: "Follower velocity alert on professional hardware tutorial. 99.8% human audit score validated; false follow profiles successfully deflected.",
    vetted: true,
  },
  {
    id: "risk_3",
    creatorId: "creator_3",
    creatorName: "Chloe Dupont",
    handle: "@chloe_dupont",
    type: "Audience Shift",
    severity: "low",
    metric: "+6% European share",
    timestamp: "1 hour ago",
    details: "Organic redistribution of audience demographics towards premium French editorial portals follows verified high-fashion feature.",
    vetted: true,
  }
];

export default function BrandDashboardView({ onSendMessage, onSelectCreator }: BrandDashboardProps) {
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [campaigns, setCampaigns] = useState<CampaignOpportunity[]>(INITIAL_CAMPAIGNS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [savedCreatorsList, setSavedCreatorsList] = useState<string[]>(["creator_1", "creator_2"]);

  // Risk anomalies state
  const [anomalies, setAnomalies] = useState<RiskAnomaly[]>(INITIAL_ANOMALIES);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>("risk_1");
  const [isAnomaliesScanning, setIsAnomaliesScanning] = useState(false);

  // Brand Campaign Creation state
  const [newTitle, setNewTitle] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newCategory, setNewCategory] = useState(CreatorCategory.FASHION);
  const [newPlatform, setNewPlatform] = useState(Platform.INSTAGRAM);
  const [newDescription, setNewDescription] = useState("");

  const handleCreateCampaign = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBudget) return;

    const newCamp: CampaignOpportunity = {
      id: "camp_" + Date.now(),
      brandId: "brand_premium",
      brandName: "Aurexia Enterprise Partner",
      brandLogo: "✦",
      brandReliabilityScore: 99,
      title: newTitle,
      description: newDescription || "High-value campaign alignment with cryptographically backstopped milestone payments.",
      budget: Number(newBudget),
      lookingFor: newCategory,
      platform: newPlatform,
      deadline: "2026-08-30",
      audienceMatchPercent: 92 + Math.floor(Math.random() * 7),
      predictedReach: "1.2M - 2.8M views",
      predictedEngagement: "8.1%",
      predictedConversions: "Verified escrow pipeline",
      predictedROI: 7.4,
      status: "Open",
      deliverablesList: ["1 Dedicated feed integration", "1 Multi-channel cross-post"]
    };

    setCampaigns([newCamp, ...campaigns]);
    setShowCampaignModal(false);
    setNewTitle("");
    setNewBudget("");
    setNewDescription("");
  };

  const toggleSaveCreator = (id: string) => {
    setSavedCreatorsList(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const triggerAuditScan = () => {
    setIsAnomaliesScanning(true);
    setTimeout(() => {
      // Add a randomized diagnostic anomaly to prove real-time swarming behavior
      const pool: Omit<RiskAnomaly, "id" | "timestamp">[] = [
        {
          creatorId: "creator_3",
          creatorName: "Chloe Dupont",
          handle: "@chloe_dupont",
          type: "Engagement Spike",
          severity: "low",
          metric: "+22.4% yield",
          details: "Simultaneous traffic ingestion from Parisian modern art portals. Content approved instantly by decentralized escrow triggers.",
          vetted: true
        },
        {
          creatorId: "creator_1",
          creatorName: "Sarah Kapoor",
          handle: "@sarah.kapoor",
          type: "Velocity Guard",
          severity: "critical",
          metric: "Caps lock reach check",
          details: "Spam block automated routine protected creator timeline. No bad actors registered on peer ledger.",
          vetted: true
        }
      ];

      const chosen = pool[Math.floor(Math.random() * pool.length)];
      const added: RiskAnomaly = {
        ...chosen,
        id: "risk_" + Date.now(),
        timestamp: "Just now"
      };

      setAnomalies(prev => [added, ...prev]);
      setSelectedAnomalyId(added.id);
      setIsAnomaliesScanning(false);
    }, 1500);
  };

  const filteredCreators = creators.filter(creator => {
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "All" || creator.platforms.includes(selectedPlatform as Platform);
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-2 font-sans text-xs" id="brand-dashboard-view">
      
      {/* PROFESSIONAL HIGH-DENSITY 3-COLUMN COCKPIT GRID SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
        
        {/* COLUMN 1: SYSTEM CONTROLLERS & DECENTRALIZED RISK MONITOR (xl:col-span-3) */}
        <div className="md:col-span-12 lg:col-span-4 xl:col-span-3 space-y-2.5">
          
          {/* VITAL STATISTICS CONSOLES - Trading Room High Density UI */}
          <div className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-2">
            <div className="flex justify-between items-center border-b border-soft-cream pb-1">
              <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest font-bold">NODE HEALTH STATS</span>
              <span className="text-[8px] text-emerald-850 font-mono bg-emerald-100/50 px-1 py-0.2 rounded font-bold">100% ONLINE</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-end border-b border-[#FAF8F5] pb-0.5">
                <div>
                  <span className="text-[8px] font-mono text-gray-400 block uppercase">ACTIVE OVERWATCH</span>
                  <span className="font-serif text-[11px] font-bold text-charcoal">3 Campaign Escrows</span>
                </div>
                <span className="text-[8px] text-[#1C3E24] font-mono font-bold">₹1.08 Cr Locked</span>
              </div>

              <div className="flex justify-between items-end border-b border-[#FAF8F5] pb-0.5">
                <div>
                  <span className="text-[8px] font-mono text-gray-400 block uppercase">RELIABILITY INDEX</span>
                  <span className="font-serif text-[11px] font-bold text-charcoal">98.4 / 100 Vetted</span>
                </div>
                <span className="text-[8px] text-gold font-mono font-bold">Zero Disputes</span>
              </div>

              <div className="flex justify-between items-end border-b border-[#FAF8F5] pb-0.5">
                <div>
                  <span className="text-[8px] font-mono text-gray-400 block uppercase font-bold">ROI MULTIPLIER</span>
                  <span className="font-serif text-[11px] font-bold text-[#1C3E24]">7.4x Avg Unit</span>
                </div>
                <span className="text-[8px] text-[#1C3E24] font-mono font-bold bg-[#FAF8F5] px-1 rounded">▲ 24% YoY</span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[8px] font-mono text-gray-400 block uppercase">TALENT INDEXED</span>
                  <span className="font-serif text-[11px] font-bold text-charcoal">1,480 Active Nodes</span>
                </div>
                <span className="text-[8px] text-gray-400 font-mono">99.7% DIDs Verified</span>
              </div>
            </div>
          </div>

          {/* AI-POWERED RISK MONITOR WIDGET (With Animated Bell and Telemetry) */}
          <div className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-2 relative overflow-hidden">
            
            {/* Header with animated bell */}
            <div className="flex justify-between items-center border-b border-soft-cream pb-1">
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                  <Bell className="w-3.5 h-3.5 text-rose-600 animate-[bounce_1.5s_infinite] shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif text-[11px] font-bold text-charcoal">AI SWARM RISK MONITOR</h4>
                  <span className="text-[7.5px] font-mono text-gray-400 uppercase tracking-widest block">Anomaly Threat Shield</span>
                </div>
              </div>
              <button 
                onClick={triggerAuditScan}
                disabled={isAnomaliesScanning}
                className="p-0.5 rounded hover:bg-soft-cream/30 border border-soft-warm-gray text-gray-500 hover:text-charcoal transition-all disabled:opacity-50"
                title="Scan Ledger Nodes"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isAnomaliesScanning ? "animate-spin text-[#B5935B]" : ""}`} />
              </button>
            </div>

            {/* List of active creator anomalies */}
            <div className="space-y-1">
              {anomalies.map((anom) => {
                const isSelected = selectedAnomalyId === anom.id;
                const isCritical = anom.severity === "critical";
                const isMedium = anom.severity === "medium";
                
                return (
                  <button
                    key={anom.id}
                    onClick={() => setSelectedAnomalyId(anom.id)}
                    className={`w-full text-left p-1.5 rounded-lg border transition-all flex justify-between items-start gap-1 cursor-pointer ${
                      isSelected 
                        ? "bg-slate-50 border-[#1C3E24] shadow-sm" 
                        : "bg-[#FAF8F5] border-[#FAF8F5] hover:border-gray-300"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className={`w-1 h-1 rounded-full ${isCritical ? "bg-red-600" : isMedium ? "bg-amber-500" : "bg-emerald-500"}`}></span>
                        <span className="font-serif font-bold text-[10.5px] text-charcoal">{anom.creatorName}</span>
                      </div>
                      <span className="text-[8px] font-mono text-gray-400 block">{anom.handle} • {anom.timestamp}</span>
                    </div>

                    <div className="text-right">
                      <span className={`text-[8px] font-mono font-bold px-1 py-0.2 rounded uppercase ${
                        isCritical ? "bg-red-50 text-red-700" : isMedium ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-800"
                      }`}>
                        {anom.type}
                      </span>
                      <span className="text-[8px] font-mono text-gray-550 block mt-0.5">{anom.metric}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected anomaly diagnostic telemetry readout */}
            {selectedAnomalyId && (
              <div className="bg-stone-50 border border-stone-200 p-1.5 rounded-lg space-y-1 animate-fade-in font-sans text-[10px] text-gray-600">
                {(() => {
                  const curr = anomalies.find(a => a.id === selectedAnomalyId);
                  if (!curr) return null;
                  return (
                    <>
                      <div className="flex justify-between items-center border-b border-stone-200 pb-0.5">
                        <span className="font-mono text-[8px] text-[#B5935B] uppercase font-bold flex items-center gap-1">
                          <Cpu className="w-2.5 h-2.5 text-[#B5935B]" /> SWARM ASSESSMENT
                        </span>
                        <span className="text-[8px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-500/10">
                          CLEARED & PASS
                        </span>
                      </div>
                      <p className="italic text-gray-550 text-[10px] leading-tight">"{curr.details}"</p>
                      <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-gray-400 border-t border-stone-200 pt-0.5">
                        <div>Heuristic: 99.8%</div>
                        <div className="text-right">Sign: ZK-SECURE✓</div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

        </div>

        {/* COLUMN 2: ADVANCED CREATOR DISCOVERY CENTER (xl:col-span-5) */}
        <div className="md:col-span-12 lg:col-span-8 xl:col-span-5 space-y-2.5">
          
          {/* Search Header Bar with filters */}
          <div className="bg-soft-cream/40 p-2.5 rounded-xl border border-soft-warm-gray space-y-2">
            <div className="flex justify-between items-center border-b border-soft-cream pb-1">
              <div>
                <h3 className="font-serif text-[12px] font-bold text-charcoal">Advanced Creator Marketplace</h3>
                <span className="text-[7.5px] text-gray-400 font-mono">FILTER: {selectedCategory} | {selectedPlatform}</span>
              </div>
              <span className="bg-[#1C3E24] text-white px-1.5 py-0.2 rounded text-[8.5px] font-mono font-medium">Verified Talent Nodes</span>
            </div>

            {/* Filters grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              
              {/* Search input field */}
              <div className="relative">
                <Search className="absolute left-2 top-1.5 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-6 pr-1.5 py-0.5 rounded bg-white text-[10px] border border-soft-warm-gray focus:outline-none focus:border-gold"
                  placeholder="Filter key..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category selector */}
              <select
                className="px-1 py-0.5 rounded bg-white border border-soft-warm-gray text-[10px] focus:outline-none focus:border-gold"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {Object.values(CreatorCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Platform selector */}
              <select
                className="px-1 py-0.5 rounded bg-white border border-soft-warm-gray text-[10px] focus:outline-none focus:border-gold"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="All">All Platforms</option>
                {Object.values(Platform).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

            </div>
          </div>

          {/* Creators High Density Cards List */}
          <div className="space-y-2">
            {filteredCreators.length === 0 ? (
              <div className="p-6 text-center text-gray-400 bg-white border border-soft-warm-gray rounded-xl">
                No verified creator matching current criteria found.
              </div>
            ) : (
              filteredCreators.map((creator) => {
                const isSaved = savedCreatorsList.includes(creator.id);
                // Highlight anomalies from monitor in creator loop as well
                const creatorAnom = anomalies.find(a => a.creatorId === creator.id);

                return (
                  <div
                    key={creator.id}
                    className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-1.5 hover:shadow-luxury transition-all duration-200"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <button onClick={() => onSelectCreator(creator)} className="flex gap-2 text-left group">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-8.5 h-8.5 rounded-lg object-cover border border-soft-warm-gray group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-charcoal text-[11.5px] group-hover:text-[#B5935B] transition-colors flex items-center gap-1">
                            {creator.name}
                            <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-emerald-600 text-white text-[7.5px]" title="Aurexia Verified Creator">
                              ✓
                            </span>
                            {creatorAnom && (
                              <span className="inline-flex items-center gap-0.5 text-[7px] bg-rose-50 text-rose-700 px-1 py-0.2 rounded border border-rose-200 animate-pulse font-mono">
                                WARN
                              </span>
                            )}
                          </h4>
                          <span className="text-[8.5px] font-mono text-gray-400 block">{creator.handle}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="bg-soft-cream px-1.5 py-0.2 text-[7.5px] rounded text-charcoal font-medium">{creator.category}</span>
                            <span className="text-[7.5px] text-gray-400 font-mono flex items-center gap-0.5">
                              <MapPin className="w-2 h-2" /> {creator.location}
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="text-right">
                        <span className="text-[7.5px] font-mono text-gray-400 uppercase block">Trust Score</span>
                        <span className="text-sm font-serif text-[#1C3E24] font-bold">{creator.trustScore.overall}</span>
                        <span className="text-[7.5px] text-gray-400 font-mono block -mt-1">/100</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-normal font-sans italic border-l border-soft-cream pl-1">
                      "{creator.bio}"
                    </p>

                    {/* Highly Compact Stats Strip */}
                    <div className="grid grid-cols-3 gap-1 bg-soft-cream/20 p-1 rounded-lg border border-soft-warm-gray text-center text-[10px] font-sans">
                      <div>
                        <div className="text-[7.5px] font-mono text-gray-405 uppercase">AUDIENCE</div>
                        <div className="font-bold text-charcoal leading-none text-[10.5px]">{creator.followersCount}</div>
                      </div>
                      <div>
                        <div className="text-[7.5px] font-mono text-gray-405 uppercase">ENGAGEMENT</div>
                        <div className="font-bold text-charcoal leading-none text-[10.5px]">{creator.engagementRate}%</div>
                      </div>
                      <div>
                        <div className="text-[7.5px] font-mono text-gray-405 uppercase">PRED. ROI</div>
                        <div className="font-bold text-[#1C3E24] leading-none text-[10.5px]">{creator.predictedROI}x</div>
                      </div>
                    </div>

                    {/* COMPACT EXPLAINABLE AI MATCHING */}
                    <div className="bg-[#FAF8F5]/85 p-1 rounded border border-gold/15">
                      <span className="text-[7.5px] font-mono text-gold font-bold uppercase block mb-0.5 flex items-center gap-1">
                        <HelpCircle className="w-2.5 h-2.5 text-[#A68042]" /> AI Peer Audit Match
                      </span>
                      <div className="grid grid-cols-2 gap-x-2.5 text-[9.5px] text-gray-500">
                        <div className="flex justify-between border-b border-[#FAF8F5]">
                          <span>Audience Quality:</span>
                          <span className="font-mono text-charcoal font-semibold">97.4% Authentic</span>
                        </div>
                        <div className="flex justify-between border-b border-[#FAF8F5]">
                          <span>Fraud Flag:</span>
                          <span className="font-mono text-emerald-800 font-semibold">Zero Core Level</span>
                        </div>
                      </div>
                    </div>

                    {/* Shortlist/Negotiate actions row */}
                    <div className="flex gap-1 pt-1 border-t border-soft-cream">
                      <button
                        onClick={() => onSendMessage(creator.id)}
                        className="flex-1 bg-charcoal text-white hover:bg-[#1C3E24] hover:text-white transition-colors py-1 rounded text-[10px] font-mono font-bold text-center cursor-pointer"
                      >
                        Negotiate Escrow
                      </button>
                      <button
                        onClick={() => toggleSaveCreator(creator.id)}
                        className={`px-2 py-1 rounded border text-[10px] font-mono transition-colors cursor-pointer ${
                          isSaved
                            ? "bg-gold border-gold text-white font-bold"
                            : "bg-white hover:bg-soft-cream border-soft-warm-gray text-charcoal"
                        }`}
                      >
                        {isSaved ? "Saved" : "Save Node"}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* COLUMN 3: ESCROW ACTIVE BRIEFS & COMPACT SHORTLIST DESK (xl:col-span-4) */}
        <div className="md:col-span-12 lg:col-span-12 xl:col-span-4 space-y-2.5">
          
          {/* ACTIVE BRIEFS CONTROL CENTER */}
          <div className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-2">
            <div className="flex justify-between items-center border-b border-soft-cream pb-1">
              <div>
                <h4 className="font-serif text-[11px] font-bold text-charcoal">Your Active Briefs Archive</h4>
                <p className="text-[7.5px] text-gray-400 font-sans">Active on Ethereum smart contracts</p>
              </div>
              <button
                onClick={() => setShowCampaignModal(true)}
                className="bg-charcoal hover:bg-[#1C3E24] text-white px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold transition-all flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5" /> Publish Brief
              </button>
            </div>

            <div className="space-y-1.5">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-2 rounded-lg border border-soft-warm-gray bg-[#FAF8F5] space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] font-mono text-gray-400 uppercase font-bold flex items-center gap-0.5">
                      {camp.brandName}
                      <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-amber-500 text-white font-black text-[7px]" title="Elite Verified Brand Partner">
                        ✦
                      </span>
                    </span>
                    <span className="text-[7px] font-mono text-[#1C3E24] bg-emerald-50 px-1 py-0.2 rounded font-bold">
                      Score: {camp.brandReliabilityScore}
                    </span>
                  </div>
                  <h4 className="font-serif text-[10px] font-bold text-charcoal leading-tight">{camp.title}</h4>
                  
                  <div className="flex justify-between items-center text-[8.5px] text-gray-400 pt-0.5 border-t border-soft-cream/65">
                    <span className="font-mono font-semibold">Budget: ₹{camp.budget.toLocaleString()}</span>
                    <span>ROI: <strong className="text-[#1C3E24] font-mono">{camp.predictedROI}x</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK SHORTLIST INTEGRITY DESK */}
          <div className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-1.5">
            <div className="border-b border-soft-cream pb-0.5">
              <h4 className="font-serif text-[11px] font-bold text-charcoal">Vetted Shortlist Board</h4>
              <p className="text-[7.5px] font-sans text-gray-400">Creators selected for next campaign batch</p>
            </div>

            {savedCreatorsList.length === 0 ? (
              <p className="text-[9.5px] text-gray-400 font-sans italic py-1 text-center">No shortlists saved on local node.</p>
            ) : (
              <div className="space-y-1">
                {savedCreatorsList.map(cid => {
                  const creatorObj = creators.find(cr => cr.id === cid);
                  if (!creatorObj) return null;
                  return (
                    <div key={cid} className="flex justify-between items-center bg-[#FAF8F5] p-1.5 rounded-lg border border-soft-cream/40">
                      <div className="flex items-center gap-1.5">
                        <img src={creatorObj.avatar} className="w-5 h-5 rounded object-cover" />
                        <div>
                          <span className="font-serif font-semibold text-[10px] text-charcoal block leading-tight">{creatorObj.name}</span>
                          <span className="text-[7.5px] font-mono text-gray-400 block -mt-0.5">{creatorObj.handle}</span>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => onSendMessage(cid)}
                          className="bg-[#1C3E24] text-white px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold cursor-pointer"
                        >
                          Chat
                        </button>
                        <button
                          onClick={() => toggleSaveCreator(cid)}
                          className="text-[8.5px] text-red-700 bg-red-50 hover:bg-red-100 px-1 py-0.5 rounded font-mono cursor-pointer"
                          title="Remove from board"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* CREATE CAMPAIGN ESCROW FORM MODAL (UNCHANGED FUNCTIONAL) */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-soft-warm-gray w-full max-w-lg p-5 shadow-luxury relative animate-fade-in">
            <button
              onClick={() => setShowCampaignModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-charcoal font-bold text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="font-serif text-base font-bold text-charcoal mb-4">Publish Active Campaign Brief</h3>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Air Max Infinity Launch"
                  className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Budget (₹ in INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2000000"
                    className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold font-mono"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Target Platform</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-white text-xs focus:outline-none focus:border-gold"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as Platform)}
                  >
                    {Object.values(Platform).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Creator Category</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-white text-xs focus:outline-none focus:border-gold"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CreatorCategory)}
                  >
                    {Object.values(CreatorCategory).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1">Description & Target Yields</label>
                <textarea
                  placeholder="Outline key deliverables, timeframes, content goals..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C3E24] hover:bg-forest-green text-white py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer"
              >
                Publish Brief & Deploy Contract Smart Guard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
