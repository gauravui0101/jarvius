import React from 'react';
import { Orbit, Cpu, ShieldCheck, ArrowUpRight, Radio } from 'lucide-react';
import { GalaxySector } from './GalaxyScene';

interface FeaturesSectionProps {
  onSelectSector: (sector: GalaxySector) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectSector }) => {
  const features = [
    {
      id: 'vector-engine',
      sector: 'arms' as GalaxySector,
      title: 'Orbital Vector Computation',
      category: 'Gravitational Kinematics',
      description:
        'Continuous N-body gravitational mapping and real-time relativistic trajectory estimation across heterogeneous galactic clusters.',
      icon: Orbit,
      glowColor: 'from-violet-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-violet-500/30 hover:border-violet-400/60',
      badge: '10.4B Vectors/s',
      badgeColor: 'text-violet-300 bg-violet-500/10 border-violet-500/30',
      highlights: ['Lorentz-invariance verification', 'Hyperbolic trajectory solver', 'Zero coordinate drift'],
    },
    {
      id: 'edge-inference',
      sector: 'core' as GalaxySector,
      title: 'Sub-Atomic Edge Inference',
      category: 'Distributed Neural Arrays',
      description:
        'Ultra-sparse quantized transformer models executing natively on orbital probes with 4.8ms round-trip latency and micro-watt efficiency.',
      icon: Cpu,
      glowColor: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
      borderColor: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
      badge: '4.8ms Latency',
      badgeColor: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30',
      highlights: ['Sparse 2-bit quantization', 'Autonomous re-clustering', 'Event-driven streaming'],
    },
    {
      id: 'resilient-mesh',
      sector: 'edge' as GalaxySector,
      title: 'Quantum-Safe Byzantine Mesh',
      category: 'Resilient Consensus',
      description:
        'Zero-knowledge state consensus with automated single-event upset (SEU) self-healing algorithms against deep-space cosmic radiation.',
      icon: ShieldCheck,
      glowColor: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
      badge: '99.999% Fault Resilient',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      highlights: ['Lattice cryptography', 'Triple-modular redundancy', 'Self-repairing memory registers'],
    },
  ];

  return (
    <section id="sectors" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-purple-500/20 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
            <Radio className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
            Galactic Infrastructure Matrix
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Architected for the Extremes of{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Deep Space
            </span>
          </h2>
          <p className="text-slate-300/80 text-base sm:text-lg">
            Layered systems engineered to thrive where light-speed propagation delays and cosmic radiation challenge traditional computing architectures.
          </p>
        </div>

        {/* Layered Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`relative rounded-3xl glass-panel p-6 sm:p-8 border transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between ${feature.borderColor}`}
              >
                {/* Subtle gradient backdrop behind card */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Card top icon & badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-purple-300 group-hover:text-fuchsia-300 transition-colors" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-purple-300/70 block mb-1">
                    {feature.category}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300/80 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 mb-8">
                    {feature.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300/90 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer action */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectSector(feature.sector)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white group-hover:text-fuchsia-300 transition-colors"
                  >
                    <span>Inspect Sector Camera</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400">0{features.indexOf(feature) + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
