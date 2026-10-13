import React from 'react';
import { Layers, Network, Radio, Sparkles, Cpu } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const tiers = [
    {
      step: '01',
      title: 'Orbital Photonic Ingestion',
      desc: 'Heterogeneous star-tracker feeds and laser interferometry pipelines streamed into synchronous spatial buffers.',
      icon: Radio,
      accent: 'from-violet-500 to-indigo-500',
    },
    {
      step: '02',
      title: 'Galactic N-Body Tensor Kernel',
      desc: 'Distributed sparse compute matrices solve billions of gravitational and relativistic trajectory parameters concurrently.',
      icon: Cpu,
      accent: 'from-purple-500 to-fuchsia-500',
    },
    {
      step: '03',
      title: 'Relativistic State Consensus',
      desc: 'Cryptographic state replication compensating for time-dilation across deep-space orbital nodes.',
      icon: Network,
      accent: 'from-fuchsia-500 to-pink-500',
    },
    {
      step: '04',
      title: 'Dimensional Projection Interface',
      desc: 'Client-side WebGL and neural rendering pipelines project high-fidelity astronomical point clouds at 120 FPS.',
      icon: Sparkles,
      accent: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <section id="architecture" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-fuchsia-500/20 text-xs font-mono text-fuchsia-300 uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
            Execution Pipeline
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            End-to-End Deep-Space Architecture
          </h2>
          <p className="text-slate-300/80 text-base sm:text-lg">
            From cosmic ray sensor arrays in outer orbit to high-precision WebGL spatial rendering on client screens.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.step}
                className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-purple-400/80 tracking-widest">
                      TIER // {t.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-purple-300 group-hover:text-fuchsia-300 transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {t.desc}
                  </p>
                </div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${t.accent} rounded-full w-full opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
