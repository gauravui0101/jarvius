import React from 'react';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Cpu, Play } from 'lucide-react';
import { GalaxySector } from './GalaxyScene';

interface HeroSectionProps {
  onExplore: () => void;
  onSelectSector: (sector: GalaxySector) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onSelectSector }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        
        {/* Subtle glowing pill badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-purple-500/25 mb-6 animate-float-slow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wide bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
            JARVIUS ORCHESTRATOR v4.2 • Autonomous Deep-Space Compute
          </span>
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
        </div>

        {/* Strong Cinematic Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Traverse the Boundless Reach of{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent text-glow">
            Galactic Intelligence
          </span>
        </h1>

        {/* Short supporting copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 font-normal leading-relaxed mb-10">
          Coordinate billions of astrophysical vectors, orbital tensor pipelines, and quantum-safe telemetry across asynchronous stellar sectors in real time.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={onExplore}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/10"
          >
            <span>Initialize System Core</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 text-purple-200" />
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={() => onSelectSector('core')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-medium text-slate-200 rounded-2xl glass-panel hover:bg-white/[0.08] hover:text-white border border-white/10 transition-all duration-300"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span>Observe Core Telemetry</span>
          </button>
        </div>

        {/* Layered Glassmorphic Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all text-left group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300/70 uppercase">Latency</span>
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">4.8 ms</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Orbital vector transit</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-fuchsia-500/30 transition-all text-left group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300/70 uppercase">Nodes</span>
              <Cpu className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">142,890</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Interstellar mesh cores</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all text-left group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300/70 uppercase">Consensus</span>
              <ShieldCheck className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">99.999%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Cosmic-ray resilient</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all text-left group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300/70 uppercase">Vectors</span>
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">10.4B/s</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Continuous trajectory calc</div>
          </div>

        </div>

      </div>
    </section>
  );
};
