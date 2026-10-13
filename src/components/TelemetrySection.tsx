import React, { useState } from 'react';
import { Activity, RefreshCw, Disc, Shield } from 'lucide-react';
import { GalaxySector } from './GalaxyScene';

interface TelemetrySectionProps {
  currentSector: GalaxySector;
  onSelectSector: (sector: GalaxySector) => void;
}

export const TelemetrySection: React.FC<TelemetrySectionProps> = ({ currentSector, onSelectSector }) => {
  const [pingState, setPingState] = useState<'idle' | 'transmitting' | 'received'>('idle');
  const [pingTime, setPingTime] = useState<number>(4.82);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    '[21:40:02.109] ORBITAL_DAEMON: Kepler-452 node synchronization verified.',
    '[21:40:02.842] FLUX_MONITOR: Spiral Arm II stellar density flux: 1.048 PW/m²',
    '[21:40:03.491] QUANTUM_LATTICE: State consensus reached across 142,890 galactic cores.',
    '[21:40:04.120] DRIFT_CALC: Relativistic frame drag compensated with Δt = 0.00012 µs.',
  ]);

  const handleSendPing = () => {
    setPingState('transmitting');
    setTimeout(() => {
      const simulatedLatency = (3.9 + Math.random() * 2.2).toFixed(2);
      setPingTime(parseFloat(simulatedLatency));
      setPingState('received');
      setTelemetryLogs((prev) => [
        `[${new Date().toISOString().substring(11, 23)}] ECHO_REPLY: Sector [${currentSector.toUpperCase()}] ping ack in ${simulatedLatency}ms.`,
        ...prev.slice(0, 4),
      ]);
    }, 600);
  };

  return (
    <section id="telemetry" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Live Telemetry Feed
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Real-Time Deep-Space Telemetry
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Monitor astronomical coordinates, orbital flux, and synchronous node packet routing from across the galaxy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSendPing}
              disabled={pingState === 'transmitting'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel-elevated hover:bg-white/[0.1] text-xs font-semibold text-purple-200 hover:text-white transition-all border border-purple-500/30 shadow-lg shadow-purple-900/20 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${pingState === 'transmitting' ? 'animate-spin' : ''}`} />
              <span>{pingState === 'transmitting' ? 'Beaming Packet...' : 'Ping Sector Node'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Telemetry Terminal */}
          <div className="lg:col-span-8 glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">jarvius-stellar-kernel@node-alpha:~$</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    ONLINE
                  </span>
                  <span>SECTOR: {currentSector.toUpperCase()}</span>
                </div>
              </div>

              {/* Dynamic Coordinate readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Ascension (α)</div>
                  <div className="text-base font-mono font-bold text-violet-300 mt-1">17h 45m 40.04s</div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Declination (δ)</div>
                  <div className="text-base font-mono font-bold text-fuchsia-300 mt-1">-29° 00′ 28.1″</div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Radial Flux</div>
                  <div className="text-base font-mono font-bold text-cyan-300 mt-1">8.42 × 10¹⁴ W</div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Roundtrip Ping</div>
                  <div className="text-base font-mono font-bold text-emerald-300 mt-1">{pingTime} ms</div>
                </div>
              </div>

              {/* Console log outputs */}
              <div className="bg-black/50 rounded-2xl p-4 border border-white/5 font-mono text-xs text-slate-300 space-y-2 h-44 overflow-y-auto">
                {telemetryLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed flex items-start gap-2">
                    <span className="text-purple-400 select-none">›</span>
                    <span className={idx === 0 ? 'text-white font-medium' : 'text-slate-400'}>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick sector selector footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-mono">Camera Coordinate Lock:</span>
              <div className="flex items-center gap-2">
                {(['overview', 'core', 'arms', 'edge'] as GalaxySector[]).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => onSelectSector(sec)}
                    className={`px-2.5 py-1 rounded-lg font-mono capitalize transition-all ${
                      currentSector === sec
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Telemetry Panels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Cluster Health */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-semibold text-white text-base flex items-center gap-2">
                  <Disc className="w-4 h-4 text-purple-400" />
                  Galactic Node Status
                </h4>
                <span className="text-xs font-mono text-emerald-400">NOMINAL</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Core Bulge Density</span>
                    <span className="text-purple-300">94.8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: '94.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Perseus Spiral Buffer</span>
                    <span className="text-cyan-300">88.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '88.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Cosmic Ray Absorption</span>
                    <span className="text-emerald-300">99.9%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '99.9%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Security Box */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Quantum Lattice State</div>
                  <div className="text-[11px] font-mono text-purple-300/70">Kyber-1024 Level 5 Active</div>
                </div>
              </div>
              <p className="text-xs text-slate-300/80 leading-relaxed">
                State integrity verified by zero-knowledge polynomial commitments across all interplanetary relays.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
