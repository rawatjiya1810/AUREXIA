/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { INITIAL_CREATORS, INITIAL_POSTS } from "../data";
import { Creator, LinkedInPost } from "../types";
import { ThumbsUp, Send, Award, CheckCircle2 } from "lucide-react";

interface CreatorDashboardProps {
  creatorId: string;
}

export default function CreatorDashboardView({ creatorId }: CreatorDashboardProps) {
  // Current active creator context
  const [creator] = useState<Creator>(
    INITIAL_CREATORS.find(c => c.id === creatorId) || INITIAL_CREATORS[0]
  );
  
  const [posts, setPosts] = useState<LinkedInPost[]>(INITIAL_POSTS);
  
  // Create Post state
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostReach, setNewPostReach] = useState("");
  const [newPostEngagement, setNewPostEngagement] = useState("");
  const [newPostROI, setNewPostROI] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Campaign Milestones");

  const [activeTab, setActiveTab] = useState<"feed" | "portfolio" | "timeline">("feed");

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: LinkedInPost = {
      id: "post_" + Date.now(),
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      creatorHandle: creator.handle,
      category: newPostCategory,
      timestamp: "Just now",
      content: newPostContent,
      metrics: {
        reach: newPostReach ? `${newPostReach} reach` : "Target checked",
        engagement: newPostEngagement ? `${newPostEngagement}% engagement` : "Not logged",
        trustScore: `Score: ${creator.trustScore.overall}`,
        roi: newPostROI ? `${newPostROI}x ROI` : "N/A"
      },
      likes: 0,
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostReach("");
    setNewPostEngagement("");
    setNewPostROI("");
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !p.hasLiked
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start" id="creator-dashboard-view">
      
      {/* COLUMN 1: PROFILE SUMMARY BRIEF & BENCHMARKS (xl:col-span-3) */}
      <div className="md:col-span-12 lg:col-span-4 xl:col-span-3 space-y-2.5">
        <div className="bg-white rounded-xl border border-soft-warm-gray overflow-hidden shadow-sm animate-fade-in">
          {/* Banner */}
          <div className="h-14 bg-cover bg-center" style={{ backgroundImage: `url(${creator.banner})` }}></div>
          
          {/* Avatar and Info */}
          <div className="p-3 relative text-center">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-white mx-auto -mt-8 relative shadow-sm bg-white"
            />
            <div className="mt-1">
              <h3 className="font-serif text-[12.5px] font-bold text-charcoal leading-snug flex items-center justify-center gap-1">
                {creator.name}
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px]" title="Aurexia KYC & Identity Verified Creator Check">
                  ✓
                </span>
              </h3>
              <span className="text-[8.5px] font-mono text-gray-400 block mt-0.5">{creator.handle}</span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-mono text-[7.5px] font-bold px-1.5 py-0.2 rounded mt-1.5 border border-emerald-100">
                🌟 {creator.verificationStatus} Talent
              </span>
            </div>

            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed font-sans block text-center max-w-xs mx-auto">
              "{creator.bio}"
            </p>

            <div className="grid grid-cols-2 gap-1 mt-3 pt-2 border-t border-soft-cream text-left">
              <div>
                <span className="text-[7.5px] font-mono text-gray-400 block uppercase">Region</span>
                <span className="text-[10px] font-semibold text-charcoal">{creator.location}</span>
              </div>
              <div>
                <span className="text-[7.5px] font-mono text-gray-400 block uppercase">Response</span>
                <span className="text-[10px] font-semibold text-charcoal">{creator.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benchmarks Badge Box */}
        <div className="bg-white p-2.5 rounded-xl border border-soft-warm-gray shadow-sm space-y-2">
          <span className="text-[8px] font-mono text-gray-400 block uppercase tracking-wider border-b border-[#FAF8F5] pb-1">IDENTITY BENCHMARKS</span>
          <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
            <div className="bg-[#FAF8F5]/80 p-1 rounded border border-soft-warm-gray">
              <span className="text-[7.5px] font-mono text-gray-400 block uppercase">IDENTITY KEY</span>
              <span className="font-semibold text-charcoal font-sans text-[8.5px] flex items-center gap-0.5 pt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" /> Bound
              </span>
            </div>
            <div className="bg-[#FAF8F5]/80 p-1 rounded border border-soft-warm-gray">
              <span className="text-[7.5px] font-mono text-gray-400 block uppercase">FRAUD LEVEL</span>
              <span className="font-semibold font-sans text-emerald-850 text-[8.5px] flex items-center gap-0.5 pt-0.5">
                💡 {creator.trustScore.fraudRisk}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2: TABULAR PORTALS & CASES FEED (xl:col-span-5) */}
      <div className="md:col-span-12 lg:col-span-8 xl:col-span-5 space-y-2.5">
        {/* Navigation tabs for creator portal */}
        <div className="border-b border-soft-warm-gray flex gap-4">
          <button
            onClick={() => setActiveTab("feed")}
            className={`pb-1 text-[10px] font-semibold font-mono uppercase tracking-wider transition-all relative ${
              activeTab === "feed" ? "text-charcoal font-bold border-b-2 border-gold" : "text-gray-400 hover:text-charcoal"
            }`}
          >
            Feed ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`pb-1 text-[10px] font-semibold font-mono uppercase tracking-wider transition-all relative ${
              activeTab === "portfolio" ? "text-charcoal font-bold border-b-2 border-gold" : "text-gray-400 hover:text-charcoal"
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`pb-1 text-[10px] font-semibold font-mono uppercase tracking-wider transition-all relative ${
              activeTab === "timeline" ? "text-charcoal font-bold border-b-2 border-gold" : "text-gray-400 hover:text-charcoal"
            }`}
          >
            Journey Map
          </button>
        </div>

        {/* Tab 1: LinkedIn-style creator feed without local broadcast form since we elevated it to column 3 */}
        {activeTab === "feed" && (
          <div className="space-y-2.5">
            <div className="space-y-2.5">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-soft-warm-gray p-2.5 shadow-sm space-y-2">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={post.creatorAvatar}
                      alt={post.creatorName}
                      className="w-7 h-7 rounded bg-[#FAF8F5] border border-soft-warm-gray object-cover"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-charcoal text-[11px] leading-tight">{post.creatorName}</h4>
                      <div className="flex items-center gap-1 text-[8.5px] text-gray-400 font-mono mt-0.5">
                        <span>{post.creatorHandle}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="bg-[#FAF8F5] border border-soft-warm-gray text-gold px-1 py-0.2 rounded text-[7px] uppercase">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ContentText */}
                  <p className="text-[10px] text-gray-600 leading-normal font-sans whitespace-pre-wrap">{post.content}</p>

                  {/* Image context if exists */}
                  {post.imageUrl && (
                    <div className="rounded overflow-hidden border border-soft-warm-gray max-h-40">
                      <img src={post.imageUrl} alt="Campaign context" className="w-full object-cover" />
                    </div>
                  )}

                  {/* Dynamic Performance Metrics Badge group */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-[#FAF8F5]/80 p-1.5 rounded border border-soft-warm-gray text-center text-[9px]">
                    <div>
                      <div className="text-[7px] font-mono text-gray-400">REACH IMPACT</div>
                      <div className="font-bold text-charcoal leading-none pt-0.5">{post.metrics.reach}</div>
                    </div>
                    <div>
                      <div className="text-[7px] font-mono text-gray-400">ENGAGEMENT</div>
                      <div className="font-bold text-charcoal leading-none pt-0.5">{post.metrics.engagement}</div>
                    </div>
                    <div>
                      <div className="text-[7px] font-mono text-gray-400">TRUST RATING</div>
                      <div className="font-bold text-[#1C3E24] leading-none pt-0.5">{post.metrics.trustScore}</div>
                    </div>
                    <div>
                      <div className="text-[7px] font-mono text-gray-400">VERIFIED ROI</div>
                      <div className="font-bold text-gold leading-none pt-0.5">{post.metrics.roi}</div>
                    </div>
                  </div>

                  {/* Comments/Likes buttons */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-soft-cream">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-1 text-[9.5px] font-mono font-semibold ${
                        post.hasLiked ? "text-gold" : "text-gray-400 hover:text-charcoal"
                      }`}
                    >
                      <ThumbsUp className="w-2.5 h-2.5" />
                      <span>{post.likes} Endorsements</span>
                    </button>
                    <span className="text-[8px] text-gray-400 font-mono">
                      ✓ Profile Secured
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Achievements & Portfolio */}
        {activeTab === "portfolio" && (
          <div className="space-y-2.5">
            <div className="bg-white p-3 rounded-xl border border-soft-warm-gray shadow-sm">
              <h3 className="font-serif text-[11px] font-bold text-charcoal mb-2">Credentials & Verification Stamps</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {creator.certifications.map((cert, index) => (
                  <div key={index} className="bg-soft-cream/30 p-2 rounded border border-soft-warm-gray flex gap-1.5 items-start">
                    <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-charcoal text-[10px] leading-tight">{cert}</h4>
                      <p className="text-[7.5px] text-gray-400 font-mono mt-0.5">ISSUER: AUREXIA TRUST INC</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-soft-warm-gray shadow-sm">
              <h3 className="font-serif text-[11px] font-bold text-charcoal mb-2">Verified Campaign Performance History</h3>
              <div className="space-y-1.5 focus:none">
                {creator.previousCollaborations.map((collab, index) => (
                  <div key={index} className="flex gap-2 items-center p-1.5 border border-soft-cream rounded-lg hover:border-gold transition-colors">
                    <div className="w-6 h-6 rounded bg-[#FAF8F5] border border-soft-warm-gray flex items-center justify-center text-[10px] shrink-0 font-serif">
                      {collab.logo}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-charcoal text-[10px] leading-none">{collab.brand}</h4>
                      <p className="text-[8px] text-gray-500 font-mono mt-0.5">{collab.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reputation Journey Timeline */}
        {activeTab === "timeline" && (
          <div className="bg-white p-3 rounded-xl border border-soft-warm-gray shadow-sm">
            <h3 className="font-serif text-[11.5px] font-bold text-charcoal mb-0.5">Consistency Roadmap Index</h3>
            <p className="text-[9.5px] text-gray-500 mb-3 font-normal">Our system monitors multi-season engagement records directly linked to ledger hashes.</p>

            <div className="relative border-l border-soft-warm-gray pl-3.5 ml-1.5 space-y-4">
              {creator.reputationHistory.map((item, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-gold flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-charcoal"></span>
                  </span>

                  <div>
                    <span className="font-mono text-[8px] font-bold text-gold block mb-0.2">{item.year} SEASON</span>
                    <h4 className="font-serif text-[10px] font-bold text-charcoal leading-none">
                      Locked Index: {item.score}/100
                    </h4>
                    <p className="text-[9.5px] text-gray-400 mt-0.5 max-w-lg leading-tight">
                      Decentralized escrow contract release verified with zero flag events recorded.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* COLUMN 3: TRUST TELEMETRY PANEL & BROADCAST CONTROLLER DESK (xl:col-span-4) */}
      <div className="md:col-span-12 lg:col-span-12 xl:col-span-4 space-y-2.5">
        {/* Dynamic Trust Breakdown widget */}
        <div className="bg-white p-2.5 rounded-xl border border-soft-warm-gray shadow-sm space-y-2 animate-fade-in">
          <div className="flex justify-between items-center border-b border-soft-cream pb-1">
            <h4 className="font-serif text-[11px] font-bold text-charcoal">Aurexia Trust Integrity Audit</h4>
            <span className="text-[13px] font-serif text-[#1C3E24] font-bold">{creator.trustScore.overall}/100</span>
          </div>

          <div className="space-y-2 text-[9.5px] text-gray-500">
            <div>
              <div className="flex justify-between font-mono text-[7.5px] uppercase mb-0.5 font-bold">
                <span>Audience Authenticity</span>
                <span className="text-charcoal font-bold">{creator.trustScore.audienceAuthenticityScore}%</span>
              </div>
              <div className="w-full bg-soft-cream h-1 rounded-full overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: `${creator.trustScore.audienceAuthenticityScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-[7.5px] uppercase mb-0.5 font-bold">
                <span>Campaign Reliability</span>
                <span className="text-charcoal font-bold">{creator.trustScore.campaignReliability}%</span>
              </div>
              <div className="w-full bg-soft-cream h-1 rounded-full overflow-hidden">
                <div className="bg-[#1C3E24] h-full rounded-full" style={{ width: `${creator.trustScore.campaignReliability}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-[7.5px] uppercase mb-0.5 font-bold">
                <span>Brand Feedback Score</span>
                <span className="text-charcoal font-bold">{creator.trustScore.brandFeedbackScore}%</span>
              </div>
              <div className="w-full bg-soft-cream h-1 rounded-full overflow-hidden">
                <div className="bg-gold h-full rounded-full" style={{ width: `${creator.trustScore.brandFeedbackScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Interface (Permanently Mounted on Desk for instant operating Access!) */}
        <div className="bg-white p-2.5 rounded-xl border border-soft-warm-gray shadow-sm">
          <span className="text-[8px] font-mono text-gray-400 block uppercase tracking-wider mb-1 px-0.5 font-bold">
            PUBLISH CASE-STUDY UPDATE
          </span>
          <form onSubmit={handleCreatePost} className="space-y-2">
            <textarea
              required
              placeholder="Share completed collaboration metrics, verified outcomes, or audience audits..."
              rows={2}
              className="w-full p-2 rounded bg-warm-ivory/5 text-[10px] border border-soft-warm-gray focus:outline-none focus:border-gold leading-snug"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <div>
                <label className="block text-[7.5px] font-mono text-gray-400 uppercase">Category</label>
                <select
                  className="w-full p-0.5 rounded border border-soft-warm-gray text-[9.5px] bg-white text-charcoal focus:outline-none focus:border-gold"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option value="Campaign Milestones">Milestones</option>
                  <option value="Audience Audits">Audits</option>
                  <option value="Engagement Intel">Engagement</option>
                </select>
              </div>
              <div>
                <label className="block text-[7.5px] font-mono text-gray-400 uppercase">Reach</label>
                <input
                  type="text"
                  className="w-full p-0.5 rounded border border-soft-warm-gray text-[9.5px] text-charcoal font-mono"
                  placeholder="e.g. 1.2M"
                  value={newPostReach}
                  onChange={(e) => setNewPostReach(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[7.5px] font-mono text-gray-400 uppercase">Engagement %</label>
                <input
                  type="text"
                  className="w-full p-0.5 rounded border border-soft-warm-gray text-[9.5px] text-charcoal font-mono"
                  placeholder="e.g. 8.7"
                  value={newPostEngagement}
                  onChange={(e) => setNewPostEngagement(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[7.5px] font-mono text-gray-400 uppercase">Yield ROI</label>
                <input
                  type="text"
                  className="w-full p-0.5 rounded border border-soft-warm-gray text-[9.5px] text-charcoal font-mono"
                  placeholder="e.g. 6.8"
                  value={newPostROI}
                  onChange={(e) => setNewPostROI(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-soft-cream/60">
              <span className="text-[7px] text-gray-400 italic">★ Confirmed on ledger</span>
              <button
                type="submit"
                className="bg-[#1C3E24] hover:bg-forest-green text-white px-2.5 py-0.5 rounded text-[9px] font-mono font-bold transition-colors flex items-center gap-0.5 cursor-pointer leading-tight"
              >
                <Send className="w-2.5 h-2.5" /> Broadcast
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
