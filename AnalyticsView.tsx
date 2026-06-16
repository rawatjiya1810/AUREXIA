/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TrendingUp, Award, BarChart3, Users, Play, DollarSign, PieChart, ShieldAlert } from "lucide-react";

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState<"brand" | "creator">("brand");

  return (
    <div className="bg-soft-cream/30 rounded-xl border border-soft-warm-gray p-4" id="analytics-view-container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#B5935B] uppercase block">
            PREDICTIVE MEASUREMENT
          </span>
          <h2 className="font-serif text-xl text-charcoal tracking-tight">
            Trust & Yield Analytics Center
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5 max-w-xl">
            Real outcomes verified on-chain. Compare authentic engagement performance, forecast campaign yields.
          </p>
        </div>

        {/* Brand vs Creator analytics switcher */}
        <div className="flex bg-white p-0.5 rounded-lg border border-soft-warm-gray self-stretch sm:self-auto shadow-sm">
          <button
            onClick={() => setActiveTab("brand")}
            className={`px-3 py-1 rounded text-[10.5px] font-mono font-bold cursor-pointer transition-all ${
              activeTab === "brand" ? "bg-charcoal text-white" : "text-gray-400 hover:text-charcoal"
            }`}
          >
            Brand View
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`px-3 py-1 rounded text-[10.5px] font-mono font-bold cursor-pointer transition-all ${
              activeTab === "creator" ? "bg-charcoal text-white" : "text-gray-400 hover:text-charcoal"
            }`}
          >
            Creator View
          </button>
        </div>
      </div>

      {activeTab === "brand" ? (
        <div className="space-y-4">
          {/* Brand High Fidelity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-sans font-bold text-gray-400 text-[9px] uppercase tracking-wider">Estimated Campaign Yield</h4>
                  <div className="text-xl font-serif text-[#1C3E24] mt-0.5">₹3.4 Crore</div>
                </div>
                <span className="text-emerald-800 text-[8px] font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  +18.4%
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                Sum of authentic engagement click-through ratios across active escrows.
              </p>

              {/* Handcrafted Visual Bar Meter */}
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between font-mono text-[8px] text-[#B5935B]">
                  <span>REMAINING REACH STAGE TARGET</span>
                  <span>94.2%</span>
                </div>
                <div className="w-full bg-soft-cream h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1C3E24] h-full rounded-full" style={{ width: "94.2%" }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-sans font-bold text-gray-400 text-[9px] uppercase tracking-wider">Audience Clearance</h4>
                  <div className="text-xl font-serif text-charcoal mt-0.5">98.9% Clean</div>
                </div>
                <span className="text-emerald-800 text-[8px] font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                  ZK SHIELD
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                Calculated cross-checking bot indexes and same-minute comment blasts.
              </p>

              {/* Interactive Audit Flag panel */}
              <div className="bg-[#FAF8F5] p-1.5 rounded border border-soft-warm-gray text-[9px] font-mono text-gray-400 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-gold shrink-0" />
                <span>Zero bots flagged in active pipelines.</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-sans font-bold text-gray-400 text-[9px] uppercase tracking-wider">ROI Multiplier</h4>
                  <div className="text-xl font-serif text-[#B5935B] mt-0.5">7.4x Combined</div>
                </div>
                <span className="text-emerald-800 text-[8px] font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                  8.2x ESTIM
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                Every rupee matches performance data ledger states dynamically.
              </p>

              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between font-mono text-[8px] text-gray-400">
                  <span>PREDICTED VS ACHIEVED RETURN SLABS</span>
                  <span>7.4x / 8.2x Verified</span>
                </div>
                <div className="w-full bg-soft-cream h-1.5 rounded-full overflow-hidden flex">
                  <div className="bg-gold h-full" style={{ width: "80%" }}></div>
                  <div className="bg-soft-warm-gray h-full animate-pulse" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Custom SVG Graph Chart panel */}
          <div className="bg-white p-4.5 rounded-lg border border-soft-warm-gray shadow-sm">
            <h3 className="font-serif text-sm font-bold text-charcoal mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#B5935B]" /> Real Outcome Yield Growth curve (2026 Fiscal Season)
            </h3>

            {/* Custom SVG line chart */}
            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 800 180" fill="none" preserveAspectRatio="none">
                {/* Horizontal mesh grids */}
                <line x1="0" y1="30" x2="800" y2="30" stroke="#EBE4DC" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="#EBE4DC" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="800" y2="130" stroke="#EBE4DC" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="170" x2="800" y2="170" stroke="#DACFC2" strokeWidth="1.5" />

                {/* Shading fill area */}
                <path
                  d="M 20 150 L 150 120 L 300 80 L 450 95 L 600 50 L 780 30 L 780 170 L 20 170 Z"
                  fill="url(#grad-lux)"
                  opacity="0.3"
                />

                {/* Main line trend */}
                <path
                  d="M 20 150 L 150 120 L 300 80 L 450 95 L 600 50 L 780 30"
                  stroke="#B5935B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Graph keypoints */}
                <circle cx="20" cy="150" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="150" cy="120" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="300" cy="80" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="450" cy="95" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="600" cy="50" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="780" cy="30" r="4.5" fill="#1E1E1E" stroke="#C5A059" strokeWidth="1.5" />

                <defs>
                  <linearGradient id="grad-lux" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" />
                    <stop offset="100%" stopColor="#FAF8F5" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Labels */}
              <div className="absolute bottom-1 w-full flex justify-between px-3 font-mono text-[8px] text-gray-400">
                <span>JAN (Launch)</span>
                <span>FEB</span>
                <span>MAR (Audit)</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN (Present)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Creator High Fidelity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
              <h4 className="font-serif text-sm font-bold text-charcoal mb-3">Top Categories</h4>
              
              <div className="space-y-2.5 font-sans text-[11px] text-gray-500">
                <div className="flex justify-between items-center">
                  <span>Fashion & Luxury</span>
                  <strong className="font-mono text-charcoal">45% total</strong>
                </div>
                <div className="w-full bg-soft-cream/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold h-full" style={{ width: "45%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Technology & AI reviews</span>
                  <strong className="font-mono text-charcoal">30% total</strong>
                </div>
                <div className="w-full bg-soft-cream/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-charcoal h-full" style={{ width: "30%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Fitness & Organic Wellness</span>
                  <strong className="font-mono text-charcoal">15% total</strong>
                </div>
                <div className="w-full bg-soft-cream/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1C3E24] h-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-soft-warm-gray shadow-sm">
              <h4 className="font-serif text-sm font-bold text-charcoal mb-2">Sovereign Reputation Auditing</h4>
              
              <div className="bg-[#FAF8F5]/80 p-2.5 rounded border border-soft-warm-gray leading-relaxed font-sans text-[11px] text-gray-500 mb-3">
                Timeliness ratings compiled into cryptographic indexes. Failed outputs trigger automated decreases.
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase">Median Score</span>
                  <div className="text-base font-serif text-charcoal font-bold">91/100</div>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase">Elite Status Slabs</span>
                  <div className="text-base font-serif text-gold font-bold">14% Top-Tier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
