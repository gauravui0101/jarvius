import React from 'react';
import { Terminal, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-12 lg:p-16 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/40">
          
          {/* Ambient glow backdrops */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-fuchsia-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-400/30 text-xs font-mono text-purple-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>ORBITAL INFRASTRUCTURE READY FOR DEPLOYMENT</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Ready to Orchestrate Your Mission on the{' '}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Stellar Grid?
              </span>
            </h2>

            <p className="text-slate-300/90 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Instantiate distributed space tensor nodes, stream real-time coordinate meshes, and execute sub-atomic inference across interplanetary distances.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#telemetry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-xl shadow-purple-800/40 hover:shadow-purple-700/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/10"
              >
                <Terminal className="w-4 h-4" />
                <span>Initialize Console</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </a>

              <a
                href="#architecture"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-medium text-slate-200 rounded-2xl glass-panel hover:bg-white/[0.08] hover:text-white border border-white/10 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 text-purple-300" />
                <span>Read Architecture Spec</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
