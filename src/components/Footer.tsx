import React from 'react';
import { Orbit, ArrowUp } from 'lucide-react';

interface FooterProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Footer: React.FC<FooterProps> = ({ reducedMotion, onToggleReducedMotion }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030014]/80 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-violet-600 to-fuchsia-600 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0a071e] rounded-[11px] flex items-center justify-center">
                  <Orbit className="w-4 h-4 text-purple-300" />
                </div>
              </div>
              <span className="font-heading font-extrabold tracking-wider text-xl bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 bg-clip-text text-transparent">
                JARVIUS
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Autonomous deep-space neural operating system for orbital constellation routing, relativistic vector calculation, and decentralized stellar telemetry.
            </p>

            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-300 font-medium">
                Systems Nominal // Deep-Space Link Online
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 font-semibold">
              Constellation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#hero" className="hover:text-purple-300 transition-colors">Galactic Core</a></li>
              <li><a href="#sectors" className="hover:text-purple-300 transition-colors">Perseus Arm</a></li>
              <li><a href="#telemetry" className="hover:text-purple-300 transition-colors">Orbital Telemetry</a></li>
              <li><a href="#architecture" className="hover:text-purple-300 transition-colors">Mesh Protocols</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 font-semibold">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#telemetry" className="hover:text-purple-300 transition-colors">Live Console</a></li>
              <li><a href="#architecture" className="hover:text-purple-300 transition-colors">Quantized Kernels</a></li>
              <li><a href="#sectors" className="hover:text-purple-300 transition-colors">Byzantine Consensus</a></li>
              <li><a href="#telemetry" className="hover:text-purple-300 transition-colors">Node Telemetry</a></li>
            </ul>
          </div>

          {/* Nav Col 3: Controls & Accessibility */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 font-semibold">
              Accessibility
            </h4>
            <div className="space-y-3">
              <button
                type="button"
                onClick={onToggleReducedMotion}
                className="w-full text-left px-3 py-2 rounded-xl glass-panel text-xs font-mono text-purple-200 hover:text-white border border-white/10 flex items-center justify-between"
              >
                <span>Motion Mode:</span>
                <span className={reducedMotion ? 'text-amber-300' : 'text-purple-400'}>
                  {reducedMotion ? 'Static' : 'Dynamic'}
                </span>
              </button>
              <div className="text-[11px] text-slate-400 leading-tight">
                WebGL rendered with 65k particles, dynamic lerp damping, and full responsive viewport adaptation.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} JARVIUS Systems. Open galaxy protocols for interstellar computing.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill hover:bg-white/[0.08] hover:text-white transition-all text-xs font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
