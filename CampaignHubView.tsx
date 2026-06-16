/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { INITIAL_COLLABORATIONS } from "../data";
import { CampaignCollaboration, DeliverableTracker } from "../types";
import { 
  CheckSquare, 
  AlertCircle, 
  PlayCircle, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Wallet, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Hourglass,
  ArrowUpRight,
  Sparkles,
  Award
} from "lucide-react";

export default function CampaignHubView() {
  const [collaborations, setCollaborations] = useState<CampaignCollaboration[]>(INITIAL_COLLABORATIONS);
  const [selectedCollab, setSelectedCollab] = useState<CampaignCollaboration>(INITIAL_COLLABORATIONS[0]);
  
  // New Interactive payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"smart_auto" | "milestone" | "manual">("smart_auto");

  const [simulationHappening, setSimulationHappening] = useState(false);
  const [showAutoTransferSuccess, setShowAutoTransferSuccess] = useState(false);
  const [lastTxHash, setLastTxHash] = useState("");

  // Helper payment methods summary
  const paymentMethodsList = [
    {
      id: "smart_auto" as const,
      title: "Aurexia Smart Auto-Escrow",
      badge: "AI-Oracle Automated",
      description: "Instantly and automatically releases 100% of the funds to the creator's wallet upon completion and programmatic audit of all deliverables. Zero manual intervention required.",
      icon: Cpu,
      color: "border-gold bg-gold/5 text-gold",
      accent: "#B5935B"
    },
    {
      id: "milestone" as const,
      title: "Milestone-Based Escrow",
      badge: "Pro-Rata Installments",
      description: "Splits campaign budget into equal fractions. Triggers individual, immediate payouts (e.g. 33.3%) to the creator as soon as each asset is approved.",
      icon: Coins,
      color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600",
      accent: "#1C3E24"
    },
    {
      id: "manual" as const,
      title: "Direct Multi-Sig Release",
      badge: "Dual Ledger Signature",
      description: "Funds are locked on the registry. Requires manual, cryptographically paired signatures from both the brand manager and the creator to authorize any release.",
      icon: Lock,
      color: "border-charcoal/20 bg-charcoal/5 text-charcoal",
      accent: "#1e1e1e"
    }
  ];

  // Generate random transaction hash for audit trails
  const generateTxHash = () => {
    return "0x" + Array.from({length: 40}, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
  };

  // Simulate approving a deliverable and triggering escrow release
  const handleApproveDeliverable = (delId: string) => {
    setSimulationHappening(true);

    setTimeout(() => {
      // 1. Update the deliverable status to Approved
      const updatedDeliverables = selectedCollab.deliverables.map((del) => {
        if (del.id === delId) {
          return {
            ...del,
            status: "Approved" as const,
            notes: "Approved automatically via Aurexia Multi-Agent brand guidelines checklist."
          };
        }
        return del;
      });

      // 2. See if all items are approved
      const allApproved = updatedDeliverables.every((del) => del.status === "Approved");
      
      let updatedStatus = allApproved ? ("Payment Released" as const) : ("Milestones Verified" as const);
      let calculatedTransferAmount = 0;
      let logText = "";
      let isAutoPaymentTriggered = false;

      const approvedTitle = selectedCollab.deliverables.find(d => d.id === delId)?.title || "Asset";

      if (selectedPaymentMethod === "smart_auto") {
        if (allApproved) {
          // Automatic transfer upon 100% completion of the project
          isAutoPaymentTriggered = true;
          calculatedTransferAmount = selectedCollab.budget;
          updatedStatus = "Payment Released";
          const tx = generateTxHash();
          setLastTxHash(tx);
          logText = `🚀 [SMART PAYMENT ORACLE EXECUTION] All deliverables (3/3) have been certified complete. AI escrow oracle programmatically unlocked and executed immediate transfer of ₹${selectedCollab.budget.toLocaleString()} to Sarah Kapoor. Tx: ${tx}.`;
        } else {
          logText = `⚡ Approved deliverable: "${approvedTitle}". Budget is secured on-chain. Ultimate release queued for 100% project completion (Smart Auto-Escrow mode).`;
        }
      } else if (selectedPaymentMethod === "milestone") {
        // Milestone payout (pro-rata fraction of the budget)
        const portion = Math.round(selectedCollab.budget / selectedCollab.deliverables.length);
        calculatedTransferAmount = portion;
        const tx = generateTxHash();
        logText = `💎 [MILESTONE RELEASE] Asset "${approvedTitle}" approved. 1/3 of the total budget (₹${portion.toLocaleString()}) was successfully routed to the creator's wallet. TxHash: ${tx}.`;
        if (allApproved) {
          updatedStatus = "Payment Released";
        }
      } else {
        // Manual Multi-Sig mode
        if (allApproved) {
          logText = `✅ All assets for "${approvedTitle}" approved. Awaiting dual-signature authorization from Nike Brand and Sarah Kapoor to process ledger release of ₹${selectedCollab.budget.toLocaleString()}.`;
        } else {
          logText = `⚡ Approved deliverable: "${approvedTitle}". Awaiting subsequent milestones.`;
        }
      }
      
      const newLog = {
        time: new Date().toISOString().replace('T', ' ').substring(0, 16),
        event: logText
      };

      const updatedCollab: CampaignCollaboration = {
        ...selectedCollab,
        status: updatedStatus,
        deliverables: updatedDeliverables,
        logs: [newLog, ...selectedCollab.logs]
      };

      setSelectedCollab(updatedCollab);
      setCollaborations(prev => prev.map(c => c.id === updatedCollab.id ? updatedCollab : c));
      setSimulationHappening(false);

      if (isAutoPaymentTriggered) {
        setShowAutoTransferSuccess(true);
      }
    }, 1200);
  };

  const handleSimulateDraftUpload = (delId: string) => {
    setSimulationHappening(true);
    setTimeout(() => {
      const updatedDeliverables = selectedCollab.deliverables.map((del) => {
        if (del.id === delId) {
          return {
            ...del,
            status: "Review Stage" as const,
            notes: "V2 Creator draft uploaded. Ready for brand manager checklist review."
          };
        }
        return del;
      });

      const newLog = {
        time: new Date().toISOString().replace('T', ' ').substring(0, 16),
        event: `✉️ Creator uploaded draft asset files for: ${selectedCollab.deliverables.find(d => d.id === delId)?.title}.`
      };

      const updatedCollab: CampaignCollaboration = {
        ...selectedCollab,
        deliverables: updatedDeliverables,
        logs: [newLog, ...selectedCollab.logs]
      };

      setSelectedCollab(updatedCollab);
      setCollaborations(prev => prev.map(c => c.id === updatedCollab.id ? updatedCollab : c));
      setSimulationHappening(false);
    }, 1000);
  };

  const handleResetCampaignSimulation = () => {
    const rawCollab = INITIAL_COLLABORATIONS[0];
    const resetCollab: CampaignCollaboration = {
      ...rawCollab,
      status: "Deliverables Tracked",
      deliverables: [
        { id: "del_1", title: "Instagram Carousel: Sustainable Lookbook", status: "Approved", dueDate: "2026-07-01", notes: "Approved by Nike Brand Manager with high feedback." },
        { id: "del_2", title: "Aesthetic Reel: Day in motion with Air Max", status: "Review Stage", dueDate: "2026-07-10", notes: "Draft uploaded. Under AI brand guidelines audit." },
        { id: "del_3", title: "Instagram Stories: Direct Link Integration", status: "Assigned", dueDate: "2026-07-15", notes: "Awaiting approval of Reel before story trigger." }
      ],
      logs: [
        { time: "2026-06-10 10:00", event: "Smart Contract deployed to Polygon with dual-signatures." },
        { time: "2026-06-12 14:30", event: "Creator Sarah Kapoor submitted Carousel Draft with asset links." },
        { time: "2026-06-13 09:12", event: "Nike approved Carousel Draft. Escrow partial release pending." },
        { time: "2026-06-15 11:00", event: "Creator submitted Aesthetic Reel draft video proof." }
      ]
    };
    setSelectedCollab(resetCollab);
    setCollaborations([resetCollab]);
    setShowAutoTransferSuccess(false);
  };

  return (
    <div className="space-y-4" id="campaign-hub-view">
      
      {/* 1. Header showing partners with elegant VERIFIED badges */}
      <div className="bg-white rounded-xl border border-soft-warm-gray p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 flex-1">
          <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block">Active Smart Operations Registry</span>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-serif text-lg font-bold text-charcoal">{selectedCollab.campaignTitle}</h2>
            <span className="bg-[#1C3E24] text-white font-mono text-[8px] px-2 py-0.5 rounded tracking-wide uppercase">
              🛡️ Locked Contract
            </span>
          </div>

          {/* Connected Entities with Verified Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[10.5px] text-gray-500 pt-1">
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded border border-soft-warm-gray shadow-sm">
              <span className="font-mono text-gray-400">Brand:</span>
              <span className="font-bold text-charcoal flex items-center gap-1">
                {selectedCollab.brandName}
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-amber-500 text-white font-black text-[7.5px]" title="Elite Verified Brand Partner">
                  ✦
                </span>
              </span>
            </div>
            
            <div className="hidden md:block text-gray-300">─────</div>

            <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded border border-soft-warm-gray shadow-sm">
              <span className="font-mono text-gray-400">Creator:</span>
              <img src={selectedCollab.creatorAvatar} className="w-4 h-4 rounded-full object-cover" />
              <span className="font-bold text-charcoal flex items-center gap-1">
                {selectedCollab.creatorName}
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px]" title="KYC & Identity Verified Creator Check">
                  ✓
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch md:items-end gap-1.5 self-stretch md:self-auto">
          <div className="text-[9px] font-mono text-gray-400 md:text-right uppercase">LOCKED SECURED ESCROW</div>
          <div className="text-xl font-serif text-[#1C3E24] font-bold md:text-right">₹{selectedCollab.budget.toLocaleString()}</div>
          <button 
            onClick={handleResetCampaignSimulation}
            className="text-[9.5px] font-mono text-[#B5935B] hover:underline hover:text-amber-700 bg-transparent border-0 cursor-pointer self-start md:self-auto flex items-center gap-1"
          >
            🔄 Reset Simulation Sandbox
          </button>
        </div>
      </div>

      {/* 2. SPECIFYING AND DISCUSSING DIFFERENT PAYMENT METHODS */}
      <div className="bg-[#FAF8F5] rounded-xl border border-soft-warm-gray p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xs font-bold text-charcoal">Select Verification & Escrow Payment Assurance Mode</h3>
            <p className="text-[10px] text-gray-500 leading-normal">Choose how the financial ledger interacts with program deliverables.</p>
          </div>
          <span className="text-[7.5px] bg-[#1C3E24]/10 text-[#1C3E24] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
            Safe Assurance
          </span>
        </div>

        {/* Dynamic 3-Column Payment Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {paymentMethodsList.map((method) => {
            const isSelected = selectedPaymentMethod === method.id;
            const IconComponent = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`text-left p-3 rounded-lg border transition-all duration-300 relative flex flex-col justify-between cursor-pointer group ${
                  isSelected 
                    ? "bg-white border-[#B5935B] shadow-sm ring-1 ring-[#B5935B]/20" 
                    : "bg-white/60 hover:bg-white border-soft-warm-gray hover:border-[#B5935B]/40"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="p-1 rounded bg-[#FAF8F5] border border-soft-warm-gray text-charcoal group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5 text-[#B5935B]" />
                    </div>
                    <span className={`text-[7.5px] font-mono px-1.5 py-0.2 rounded-full font-semibold uppercase ${
                      isSelected ? "bg-amber-100 text-[#A68042]" : "bg-gray-100 text-gray-500"
                    }`}>
                      {method.badge}
                    </span>
                  </div>

                  <h4 className="font-sans font-bold text-charcoal text-[11px] group-hover:text-[#B5935B] transition-colors">
                    {method.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                    {method.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-soft-cream w-full flex items-center justify-between text-[#1C3E24] font-mono text-[8px] font-bold">
                    <span> ACTIVE PROTOCOL</span>
                    <span>✓ Programmatically Bound</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Automatic Escrow Success Visual overlay / pop block */}
      {showAutoTransferSuccess && (
        <div className="bg-gradient-to-r from-emerald-950 to-[#121E16] text-[#FAF8F5] border border-emerald-500/30 rounded-xl p-4 md:p-5 relative overflow-hidden animate-fade-in shadow-lg">
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <Sparkles className="w-32 h-32 text-emerald-400 animate-pulse" />
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-300">
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-200 uppercase font-black tracking-wider">
                  Programmatic Oracle Clear
                </span>
                <span className="text-xs text-emerald-300 font-mono">AUTOMATED INSTANT TRANSFER</span>
              </div>

              <h4 className="font-serif text-sm font-bold text-white">Smart Auto-Escrow Succeeded!</h4>
              <p className="text-[10.5px] text-gray-300 leading-relaxed max-w-2xl font-sans">
                Aurexia AI Nodes confirmed all project deliverables are approved. Total campaign treasury of <strong className="text-white">₹{selectedCollab.budget.toLocaleString()}</strong> has been automatically released from Nike India's escrow vault and deployed directly to <strong className="text-white">Sarah Kapoor's</strong> destination wallet.
              </p>

              <div className="pt-2 flex flex-col md:flex-row gap-2.5 text-[10px] font-mono text-gray-400">
                <div>
                  <span className="text-gray-500 block">DESTINATION KEY:</span>
                  <span className="text-gray-300">0xSarahKapoorVerifiedAddress743819c9e</span>
                </div>
                <div className="md:border-l md:border-gray-800 md:pl-2.5">
                  <span className="text-gray-500 block">BLOCKCHAIN TRANSACTION HASH:</span>
                  <span className="text-gold truncate max-w-64 block" title={lastTxHash}>{lastTxHash}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAutoTransferSuccess(false)}
              className="text-[9.5px] text-gray-400 hover:text-white bg-transparent border-0 p-1 cursor-pointer font-bold font-mono"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 4. Workflow Pipeline Grid */}
      <div className="bg-soft-cream/30 rounded-xl border border-soft-warm-gray p-4">
        <h3 className="font-serif text-xs font-bold text-charcoal mb-2">Aurexia Smart Escrow Workflow Pipeline</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[10px] font-mono">
          <div className="bg-white p-2.5 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20">
            <span className="text-[8px] text-gray-400 block uppercase">1. SETUP</span>
            <span className="font-bold text-charcoal truncate">Campaign Brief</span>
            <span className="text-[8px] text-[#1C3E24] font-bold bg-[#FAF8F5] px-1 py-0.2 rounded">✓ Confirmed</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20">
            <span className="text-[8px] text-gray-400 block uppercase">2. BID</span>
            <span className="font-bold text-charcoal truncate">Creator Vetted</span>
            <span className="text-[8px] text-[#1C3E24] font-bold bg-[#FAF8F5] px-1 py-0.2 rounded">✓ Matched</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20">
            <span className="text-[8px] text-gray-400 block uppercase">3. ESCROW</span>
            <span className="font-bold text-charcoal truncate">Ledger Key Bound</span>
            <span className="text-[8px] text-[#1C3E24] font-bold bg-[#FAF8F5] px-1 py-0.2 rounded">✓ Deposited</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20">
            <span className="text-[8px] text-gray-400 block uppercase">4. PROGRESS</span>
            <span className="font-bold text-charcoal truncate">Assets Tracking</span>
            <span className="text-[8px] text-gold font-bold bg-amber-50 px-1 py-0.2 rounded animate-pulse">● Active</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20 flex-nowrap">
            <span className="text-[8px] text-gray-400 block uppercase">5. REVIEW</span>
            <span className="font-bold text-charcoal truncate">Anomalies Audit</span>
            <span className="text-[8px] text-gray-400 italic">Pre-Approval</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-soft-warm-gray flex flex-col justify-between h-20">
            <span className="text-[8px] text-gray-400 block uppercase">6. CLEARANCE</span>
            <span className={`font-bold truncate ${selectedCollab.status === "Payment Released" ? "text-emerald-600 animate-pulse font-extrabold" : "text-gray-400"}`}>
              {selectedCollab.status === "Payment Released" ? "Released" : "Automatic Delay"}
            </span>
            <span className="text-[8px] text-gray-400 italic">Programmed</span>
          </div>
        </div>
      </div>

      {/* Main split: left deliverables board and right audit events log */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Left board: deliverables tracker */}
        <div className="xl:col-span-8 space-y-3">
          <div className="bg-white rounded-xl border border-soft-warm-gray overflow-hidden shadow-sm">
            <div className="p-3.5 border-b border-soft-cream flex justify-between items-center bg-warm-ivory/15">
              <div>
                <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block">Active Operations Board</span>
                <h3 className="font-serif text-[13px] font-bold text-charcoal mt-0.5">{selectedCollab.campaignTitle}</h3>
              </div>
              <span className="bg-yellow-50 text-[#A68042] border border-yellow-200 font-mono text-[8px] font-bold px-2 py-0.5 rounded">
                ● STATUS: {selectedCollab.status}
              </span>
            </div>

            {/* List of individual Deliverables items */}
            <div className="divide-y divide-soft-cream">
              {selectedCollab.deliverables.map((del) => {
                const isAssigned = del.status === "Assigned";
                const isReview = del.status === "Review Stage";
                const isApproved = del.status === "Approved";

                return (
                  <div key={del.id} className="p-4 hover:bg-warm-ivory/10 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="space-y-0.5 max-w-lg">
                      <span className={`inline-block font-mono text-[8.5px] font-bold px-1.5 py-0.2 rounded-full ${
                        isApproved 
                          ? "bg-emerald-50 text-[#1C3E24] border border-emerald-200" 
                          : isReview 
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {del.status}
                      </span>
                      <h4 className="font-sans font-bold text-charcoal text-[12px]">{del.title}</h4>
                      <p className="text-[11px] text-gray-500">{del.notes || "No creator notes submitted yet."}</p>
                      <span className="block text-[9px] font-mono text-gray-400">Due: {del.dueDate}</span>
                    </div>

                    <div className="flex gap-1.5 self-stretch sm:self-auto justify-end">
                      {isAssigned && (
                        <button
                          onClick={() => handleSimulateDraftUpload(del.id)}
                          disabled={simulationHappening}
                          className="px-2.5 py-1 bg-[#EBE4DC] hover:bg-[#DFD7CE] transition-colors rounded text-[10px] font-mono text-charcoal cursor-pointer disabled:opacity-50 font-bold"
                        >
                          Simulate Draft
                        </button>
                      )}
                      {(isAssigned || isReview) && (
                        <button
                          onClick={() => handleApproveDeliverable(del.id)}
                          disabled={simulationHappening}
                          className="px-2.5 py-1 bg-charcoal hover:bg-forest-green text-white transition-colors rounded text-[10px] font-mono font-bold cursor-pointer disabled:opacity-50"
                        >
                          Approve Asset
                        </button>
                      )}
                      {isApproved && (
                        <span className="text-[10px] font-mono text-[#1C3E24] font-bold flex items-center gap-0.5">
                          ✓ Released
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side: On-chain event Logs & Oracle parameters */}
        <div className="xl:col-span-4 space-y-3">
          <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
            <h4 className="font-serif text-[12px] font-bold text-charcoal mb-2">Escrow Oracle Parameters</h4>
            
            <div className="space-y-3 text-[11px] font-sans">
              <div className="bg-[#FAF8F5] p-2 rounded border border-soft-warm-gray leading-relaxed text-gray-500 text-[10.5px]">
                <span className="font-mono text-[8px] text-[#B5935B] block uppercase font-bold mb-0.5">Dual-signature Key Lock</span>
                Milestone payments are automatically held in immutable smart contracts. Approved drafts automatically trigger payment release.
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-soft-cream pb-0.5 text-gray-500">
                  <span>Selected Method:</span>
                  <strong className="font-mono text-[#B5935B]">
                    {paymentMethodsList.find(m => m.id === selectedPaymentMethod)?.title.replace("Aurexia ", "")}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-soft-cream pb-0.5 text-gray-500">
                  <span>Project Escrow:</span>
                  <strong className="font-mono text-charcoal">₹{selectedCollab.budget.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between border-b border-soft-cream pb-0.5 text-gray-500">
                  <span>Network Ledger:</span>
                  <strong className="font-mono text-charcoal">Polygon PoS</strong>
                </div>
                <div className="flex justify-between border-b border-soft-cream pb-0.5 text-gray-500">
                  <span>Contract Hash:</span>
                  <span className="font-mono text-gray-400 truncate max-w-32 select-all cursor-pointer hover:text-gold" title={selectedCollab.smartContractAddress}>
                    {selectedCollab.smartContractAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-charcoal text-gray-200 p-3.5 rounded-lg border border-black shadow-inner break-all">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2">
              <span className="text-[8px] font-mono text-gray-400 tracking-wider">LEDGER STATE BLOCKTIME EVENT LOGS</span>
              <span className="text-[8px] text-emerald-400 font-mono">LIVE SYNC</span>
            </div>

            <div className="space-y-2 font-mono text-[9.5px] leading-relaxed max-h-52 overflow-y-auto">
              {simulationHappening && (
                <div className="text-gold animate-pulse text-center p-1 border border-dashed border-gold/30 rounded">
                  TRANSACTION PENDING IN MINTING CUBE...
                </div>
              )}
              {selectedCollab.logs.map((log, index) => (
                <div key={index} className="border-l border-emerald-500/30 pl-2">
                  <span className="text-gray-500 block text-[8px] mb-0.5">{log.time}</span>
                  <p className="text-gray-300">{log.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
