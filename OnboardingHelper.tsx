/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, CheckCircle2, User, Building, Heart, Laptop, ArrowRight } from "lucide-react";

export default function OnboardingHelper() {
  const [role, setRole] = useState<"brand" | "creator" | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Brand onboarding details
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Fashion & Retail");
  const [budgetRange, setBudgetRange] = useState("₹5,00,000 - ₹20,00,000");

  // Creator onboarding details
  const [creatorName, setCreatorName] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [primaryPlatform, setPrimaryPlatform] = useState("Instagram");

  const [generatedResults, setGeneratedResults] = useState<{
    profileType: string;
    trustScore: number;
    auditId: string;
    remarks: string;
  } | null>(null);

  const handleNextStep = () => {
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCompleted(true);
        // Generate simulated AI scoring results dynamically
        setGeneratedResults({
          profileType: role === "brand" ? "Enterprise Buyer Node" : "Vetted Content Partner",
          trustScore: role === "brand" ? 95 : 92 + Math.floor(Math.random() * 7),
          auditId: "AUX-" + Math.floor(100000 + Math.random() * 900000),
          remarks: role === "brand" 
            ? "Intelligence profile compiled. Budget ranges verified against standard KYC pools."
            : "Platform API endpoints checked. Audience authenticity index rated high. Decentralized Identity key ready."
        });
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const resetOnboarding = () => {
    setRole(null);
    setStep(1);
    setCompleted(false);
    setGeneratedResults(null);
    setCompanyName("");
    setCreatorName("");
    setFollowerCount("");
  };

  return (
    <div className="bg-white rounded-2xl border border-soft-warm-gray p-6 md:p-8 max-w-2xl mx-auto shadow-luxury" id="onboarding-system-container">
      <div className="text-center mb-6">
        <span className="text-xs font-mono tracking-widest text-[#A68042] uppercase block mb-2">
          GATEWAY CONFIGURATION
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal tracking-tight">
          Intelligent Onboarding Simulator
        </h3>
        <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
          Establish your verified standing in the Aurexia ecosystem. Our agents cross-compile network tokens immediately.
        </p>
      </div>

      {!completed ? (
        <div className="space-y-6">
          {/* Step 1: Select Role */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="block text-xs font-mono uppercase text-gray-400 text-center">Step 1: Choose Your Core Intent</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setRole("brand")}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    role === "brand"
                      ? "bg-soft-cream/60 border-gold shadow-luxury-hover ring-1 ring-gold"
                      : "bg-white hover:bg-soft-cream/15 border-soft-warm-gray"
                  }`}
                >
                  <Building className="w-8 h-8 text-gold mb-3" />
                  <h4 className="font-serif text-lg font-bold text-charcoal">I represent a Brand</h4>
                  <p className="text-xs text-gray-500 mt-1">Deploy campaign pools, filter candidates, and automate payouts securely with smart escrows.</p>
                </button>

                <button
                  onClick={() => setRole("creator")}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    role === "creator"
                      ? "bg-soft-cream/60 border-gold shadow-luxury-hover ring-1 ring-gold"
                      : "bg-white hover:bg-soft-cream/15 border-soft-warm-gray"
                  }`}
                >
                  <User className="w-8 h-8 text-[#1C3E24] mb-3" />
                  <h4 className="font-serif text-lg font-bold text-charcoal">I am a Creator</h4>
                  <p className="text-xs text-gray-500 mt-1">Bind social DID tokens, audit audience authenticity, and build secure on-chain reputation logs.</p>
                </button>
              </div>

              {role && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="bg-charcoal text-white hover:bg-forest-green px-5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Form Details */}
          {step === 2 && role === "brand" && (
            <div className="space-y-4">
              <span className="block text-xs font-mono uppercase text-gray-400">Step 2: Company Verification Parameters</span>
              
              <div className="space-y-3 font-sans">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nike India"
                    className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-sans">Primary Vertical</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-white text-xs focus:outline-none"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option value="Fashion & Retail">Fashion & Retail</option>
                      <option value="Consumer Technology">Consumer Technology</option>
                      <option value="Organic Foods & Wellness">Organic Foods & Wellness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-sans">Typical Campaign Budget</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-white text-xs focus:outline-none"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                    >
                      <option value="₹5,00,000 - ₹20,00,000">₹5,00,000 - ₹20,00,000</option>
                      <option value="₹20,00,000 - ₹80,00,000">₹20,00,000 - ₹80,00,000</option>
                      <option value="₹80,00,000+">₹80,00,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded border border-soft-warm-gray text-xs font-mono"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!companyName.trim() || loading}
                  className="bg-charcoal text-white hover:bg-forest-green px-6 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1"
                >
                  {loading ? "Verifying..." : "Generate Intelligence Profile"}
                </button>
              </div>
            </div>
          )}

          {step === 2 && role === "creator" && (
            <div className="space-y-4">
              <span className="block text-xs font-mono uppercase text-gray-400">Step 2: Social Account & Credentials Bind</span>

              <div className="space-y-3 font-sans">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Your Professional Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Kapoor"
                    className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Estimated Audience Count</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 500k, 1.2M"
                      className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-warm-ivory/10 text-xs focus:outline-none focus:border-gold font-mono"
                      value={followerCount}
                      onChange={(e) => setFollowerCount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Focus Social Node</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-soft-warm-gray bg-white text-xs focus:outline-none"
                      value={primaryPlatform}
                      onChange={(e) => setPrimaryPlatform(e.target.value)}
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded border border-soft-warm-gray text-xs font-mono"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!creatorName.trim() || !followerCount.trim() || loading}
                  className="bg-charcoal text-white hover:bg-forest-green px-6 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1"
                >
                  {loading ? "Compiling..." : "Generate Verified Reputation"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm text-2xl">
            ✓
          </div>

          <div>
            <h4 className="font-serif text-2xl text-charcoal">Onboarding Success & Vetted Successfully</h4>
            <p className="text-xs text-gray-400 mt-1 font-mono">Ledger Cryptographic Audit Index ID: {generatedResults?.auditId}</p>
          </div>

          <div className="bg-soft-cream/60 p-5 rounded-xl border border-soft-warm-gray max-w-md mx-auto space-y-3 text-left text-xs text-gray-600 font-sans">
            <div className="flex justify-between border-b border-soft-cream pb-1">
              <span>Account Credentials Node:</span>
              <strong className="text-charcoal">{role === "brand" ? companyName : creatorName}</strong>
            </div>
            <div className="flex justify-between border-b border-soft-cream pb-1">
              <span>Dynamic Aurexia Segment:</span>
              <strong className="text-charcoal font-mono uppercase text-[10px]">{generatedResults?.profileType}</strong>
            </div>
            <div className="flex justify-between border-b border-soft-cream pb-1">
              <span>Initial System Trust Rating:</span>
              <strong className="text-emerald-800 font-mono text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {generatedResults?.trustScore}/100 Verified
              </strong>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1 mt-2">AUREXIA SWARM ASSESSMENT:</span>
              <p className="leading-relaxed text-gray-500 text-[11px] p-2 bg-white rounded border border-soft-warm-gray">
                {generatedResults?.remarks}
              </p>
            </div>
          </div>

          <div className="pt-4 space-x-2">
            <button
              onClick={resetOnboarding}
              className="px-5 py-2 bg-charcoal hover:bg-forest-green text-white transition-colors rounded-lg text-xs font-mono font-bold"
            >
              Simulate New Profile Onboarding
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
