/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Shield, Key, Database, RefreshCw, FileText, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

interface VerificationLog {
  id: string;
  creatorHandle: string;
  timestamp: string;
  testPassed: string;
  ledgerTx: string;
  status: "verified" | "warning";
}

export default function TrustIntelligence() {
  const [didKeyGenerated, setDidKeyGenerated] = useState(false);
  const [didPublicKey, setDidPublicKey] = useState("");
  const [isGeneratingDID, setIsGeneratingDID] = useState(false);
  const [zkpApproved, setZkpApproved] = useState(false);
  const [zkpLoading, setZkpLoading] = useState(false);

  const [logs, setLogs] = useState<VerificationLog[]>([
    { id: "log_1", creatorHandle: "@sarah.kapoor", timestamp: "2026-06-15 10:20", testPassed: "Identity Verified (KYC match)", ledgerTx: "0x8fa2...93b1", status: "verified" },
    { id: "log_2", creatorHandle: "@sarah.kapoor", timestamp: "2026-06-15 11:45", testPassed: "Audience Botanist scan: 97.4% Authentic", ledgerTx: "0x2da8...c014", status: "verified" },
    { id: "log_3", creatorHandle: "@marcus.tech.ai", timestamp: "2026-06-14 09:12", testPassed: "Identity Verified (DID Token)", ledgerTx: "0x3e1a...2c5d", status: "verified" },
    { id: "log_4", creatorHandle: "@chloe_dupont", timestamp: "2026-06-14 16:30", testPassed: "Audience Audit: High density human growth", ledgerTx: "0x4ca1...8ef6", status: "verified" },
    { id: "log_5", creatorHandle: "@unusual_bot_test", timestamp: "2026-06-13 14:02", testPassed: "Audience anomaly flag: +40k followers in 1hr", ledgerTx: "0x98f2...12a4", status: "warning" },
  ]);

  const generateDID = () => {
    setIsGeneratingDID(true);
    setTimeout(() => {
      const generatedHex = "did:aurexia:eth:" + Math.random().toString(16).substring(2, 10).toUpperCase() + "..." + Math.random().toString(16).substring(2, 10).toUpperCase();
      setDidPublicKey(generatedHex);
      setDidKeyGenerated(true);
      setIsGeneratingDID(false);
    }, 1500);
  };

  const verifyZeroKnowledgeProof = () => {
    setZkpLoading(true);
    setTimeout(() => {
      setZkpApproved(true);
      setZkpLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-soft-cream/40 rounded-2xl border border-soft-warm-gray p-4" id="trust-intelligence-wrapper">
      <div className="mb-4">
        <span className="text-[10px] font-mono tracking-widest text-[#A68042] uppercase block mb-1">
          TRUST LAYER ARCHITECTURE
        </span>
        <h2 className="font-serif text-xl text-charcoal tracking-tight">
          Trust Intelligence Engine & Ledger Book
        </h2>
        <p className="text-gray-500 mt-1 max-w-2xl text-[11px] leading-relaxed">
          Immutable verification layer combining decentralized identities (DIDs) with zero-knowledge mathematical proofs.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Card 1: Decentralized Identity (DID) Generator */}
        <div className="bg-white p-4 rounded-xl border border-soft-warm-gray shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded bg-[#EFE9E1] flex items-center justify-center text-[#A68042]">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-charcoal text-xs">Decentralized Identity (DID)</h3>
                <span className="text-[9px] font-mono text-gray-400 block -mt-0.5">W3C Cryptographic Token</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
              Privately sign agreements using cryptographic private keys. Proves ownership without traditional passwords or raw credential stores.
            </p>

            {didKeyGenerated ? (
              <div className="bg-soft-cream p-2 rounded-lg border border-soft-warm-gray mb-3 font-mono text-[10px] text-[#1C3E24] break-all">
                <div className="text-[8px] text-gray-400 uppercase font-mono mb-0.5">YOUR SECURE DID HANDLE</div>
                {didPublicKey}
              </div>
            ) : (
              <div className="bg-gray-50 p-2.5 rounded border border-dashed border-gray-300 text-center text-[10px] text-gray-400 mb-3 italic">
                No active DID token bound. Prepare cryptographic keys.
              </div>
            )}
          </div>

          <button
            onClick={generateDID}
            disabled={isGeneratingDID}
            className="w-full bg-charcoal text-white hover:bg-[#1E1E1E] transition-colors py-1.5 rounded text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isGeneratingDID ? (
              <RefreshCw className="animate-spin w-3 h-3 text-gold" />
            ) : (
              <Shield className="w-3 h-3 text-gold" />
            )}
            {isGeneratingDID ? "Binding Keystore..." : "Mint Cryptographic DID Key"}
          </button>
        </div>

        {/* Card 2: Zero-Knowledge Demystified */}
        <div className="bg-white p-4 rounded-xl border border-soft-warm-gray shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded bg-[#FAF8F5] border border-soft-warm-gray flex items-center justify-center text-charcoal">
                <Cpu className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-charcoal text-xs">Zero-Knowledge Proofs</h3>
                <span className="text-[9px] font-mono text-gray-400 block -mt-0.5">Privacy-Preserving Math Engine</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
              Verify sensitive metrics (e.g. active demographics, income size) without exposing underlying client backend databases.
            </p>

            <div className="bg-[#FAF8F5] p-2 rounded border border-soft-warm-gray space-y-1.5 mb-3 text-[10.5px]">
              <div className="flex justify-between items-center text-gray-500">
                <span>Proposed Statement:</span>
                <span className="font-mono text-charcoal text-[10px] font-bold">Audience is 70%+ Female</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Proof Protocol:</span>
                <span className="font-mono text-[9px] bg-charcoal text-gray-200 px-1 py-0.2 rounded">zk-SNARKs v2</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Outcome:</span>
                {zkpApproved ? (
                  <span className="text-[#1C3E24] font-bold flex items-center gap-0.5 text-[9px]">
                    <CheckCircle2 className="w-3 h-3" /> Checked & Math-Proven
                  </span>
                ) : (
                  <span className="text-amber-850 italic text-[9.5px]">Unproven</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={verifyZeroKnowledgeProof}
            disabled={zkpLoading || zkpApproved}
            className="w-full bg-[#EBE4DC] hover:bg-[#DFD7CE] text-charcoal transition-colors py-1.5 rounded text-[10px] font-semibold flex items-center justify-center gap-1.5 border border-soft-warm-gray disabled:opacity-50 cursor-pointer"
          >
            {zkpLoading ? (
              <RefreshCw className="animate-spin w-3.5 h-3.5" />
            ) : zkpApproved ? (
              "Statement Cryptographically Approved"
            ) : (
              "Execute Zero Knowledge Proof Math"
            )}
          </button>
        </div>

        {/* Card 3: Blockchain Record Verification */}
        <div className="bg-white p-4 rounded-xl border border-soft-warm-gray shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded bg-[#EFE9E1] flex items-center justify-center text-charcoal">
                <Database className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-charcoal text-xs">On-Chain Ledger Hub</h3>
                <span className="text-[9px] font-mono text-gray-400 block -mt-0.5">Polygon Trust Anchoring Layer</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
              Contracts, escrow statements, milestones, and feedback scores are committed as hashes to secure non-retroactive logs.
            </p>

            <div className="space-y-1 font-mono text-[9px] text-gray-400 bg-charcoal p-2.5 rounded-lg text-left leading-relaxed">
              <div><span className="text-teal-400 font-bold">GENESIS BLOCK SECURED</span></div>
              <div className="truncate"><span className="text-gray-500">Network ID:</span> 137 [Polygon POS Mainnet]</div>
              <div className="truncate"><span className="text-gray-500">Smart Contract:</span> 0x8a1c...Fd6552</div>
              <div><span className="text-gold">Status:</span> Gas efficient, reputation locked.</div>
            </div>
          </div>

          <div className="mt-3 text-[9px] text-gray-400 text-center italic">
            Integrates double-party transaction receipts.
          </div>
        </div>
      </div>

      {/* Verification Ledger Logs Table */}
      <div className="mt-4 bg-white rounded-xl border border-soft-warm-gray overflow-hidden shadow-sm">
        <div className="p-3 border-b border-soft-cream flex items-center justify-between bg-warm-ivory">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gold" />
            <h3 className="font-sans font-bold text-charcoal text-xs">Aurexia Dynamic Intelligence Audit Trail</h3>
          </div>
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Last 5 audits</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[10.5px]">
            <thead>
              <tr className="bg-soft-cream/40 text-gray-400 uppercase text-[8.5px] font-mono tracking-wider border-b border-soft-warm-gray">
                <th className="p-3">Creator / Token Node</th>
                <th className="p-3">Timestamp (UTC)</th>
                <th className="p-3">Verification Check outcome</th>
                <th className="p-3">Ledger Anchored Hash</th>
                <th className="p-3 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft-cream">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-warm-ivory/50 transition-colors">
                  <td className="p-3 font-mono font-medium text-charcoal">{log.creatorHandle}</td>
                  <td className="p-3 text-gray-500">{log.timestamp}</td>
                  <td className="p-3 text-gray-600 font-medium">{log.testPassed}</td>
                  <td className="p-3 font-mono text-gray-400 select-all cursor-pointer hover:text-gold">{log.ledgerTx}</td>
                  <td className="p-3 text-right">
                    {log.status === "verified" ? (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded text-[8px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> SECURED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded text-[8px] font-mono bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                        <AlertTriangle className="w-2.5 h-2.5" /> AI WARNING
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
