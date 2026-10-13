import React, { useState } from 'react';
import { Sliders, Zap, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { GalaxySector } from './GalaxyScene';

interface GalaxyControlsProps {
  sector: GalaxySector;
  onSelectSector: (sector: GalaxySector) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  speed: number;
  onSetSpeed: (speed: number) => void;
  starDensity: 'low' | 'medium' | 'high';
  onSetDensity: (density: 'low' | 'medium' | 'high') => void;
}

export const GalaxyControls: React.FC<GalaxyControlsProps> = ({
  sector,
  onSelectSector,
  reducedMotion,
  onToggleReducedMotion,
  speed,
  onSetSpeed,
  starDensity,
  onSetDensity,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sectorOptions: { id: GalaxySector; name: string; desc: string }[] = [
    { id: 'overview', name: 'Overview', desc: 'Galactic plane panorama' },
    { id: 'core', name: 'Galactic Core', desc: 'Central luminous bulge' },
    { id: 'arms', name: 'Perseus Arm', desc: 'Dense spiral star lanes' },
    { id: 'edge', name: 'Edge Horizon', desc: 'Disk accretion horizon' },
  ];

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-80">
      <div className="glass-panel-elevated rounded-2xl p-4 transition-all duration-300 shadow-2xl backdrop-blur-2xl border border-purple-500/20">
        
        {/* Header with expand/collapse */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-200 font-mono">
              Galaxy Viewport Telemetry
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label={isExpanded ? 'Collapse controls' : 'Expand controls'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Sector Quick Switcher (Always visible) */}
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {sectorOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectSector(opt.id)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left flex flex-col ${
                sector === opt.id
                  ? 'bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 text-white border border-purple-400/40 shadow-sm'
                  : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-transparent'
              }`}
            >
              <span className="font-semibold">{opt.name}</span>
              <span className="text-[10px] text-purple-300/60 truncate">{opt.desc}</span>
            </button>
          ))}
        </div>

        {/* Collapsible advanced options */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
            
            {/* Motion toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Orbital Motion
              </span>
              <button
                type="button"
                onClick={onToggleReducedMotion}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                  reducedMotion
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                    : 'bg-violet-600/20 text-violet-200 border-violet-500/40'
                }`}
              >
                {reducedMotion ? 'Static Mode' : 'Continuous'}
              </button>
            </div>

            {/* Orbit Speed presets */}
            {!reducedMotion && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    Drift Velocity
                  </span>
                  <span className="font-mono text-[11px] text-purple-300">{speed}x</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onSetSpeed(s)}
                      className={`flex-1 py-1 rounded-lg text-xs font-mono transition-all ${
                        speed === s
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Particle Density */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                  Stellar Density
                </span>
                <span className="font-mono text-[11px] text-fuchsia-300 uppercase">{starDensity}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(['low', 'medium', 'high'] as const).map((density) => (
                  <button
                    key={density}
                    type="button"
                    onClick={() => onSetDensity(density)}
                    className={`flex-1 py-1 rounded-lg text-xs capitalize font-medium transition-all ${
                      starDensity === density
                        ? 'bg-fuchsia-600/80 text-white'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
