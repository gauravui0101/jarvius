import React, { useState } from 'react';
import { Orbit, Terminal, Menu, X, Compass, Radio } from 'lucide-react';
import { GalaxySector } from './GalaxyScene';

interface NavbarProps {
  currentSector: GalaxySector;
  onSelectSector: (sector: GalaxySector) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSector,
  onSelectSector,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', sector: 'overview' as GalaxySector, href: '#hero' },
    { label: 'Sectors', sector: 'arms' as GalaxySector, href: '#sectors' },
    { label: 'Telemetry', sector: 'core' as GalaxySector, href: '#telemetry' },
    { label: 'Architecture', sector: 'edge' as GalaxySector, href: '#architecture' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-4 py-3 sm:px-6 flex items-center justify-between shadow-2xl shadow-purple-950/20 backdrop-blur-xl border border-white/10">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => onSelectSector('overview')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg p-1"
            aria-label="Jarvius Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700/80 via-violet-600/70 to-fuchsia-600/80 p-[1px] shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <div className="w-full h-full bg-[#0a071e]/90 rounded-[11px] flex items-center justify-center">
                <Orbit className="w-5 h-5 text-purple-300 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-heading font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 bg-clip-text text-transparent">
                JARVIUS
              </span>
              <span className="text-[10px] tracking-widest uppercase text-purple-300/60 font-mono -mt-1 hidden sm:block">
                Deep Space Neural OS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectSector(link.sector);
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 relative ${
                  currentSector === link.sector
                    ? 'text-white bg-white/[0.08] shadow-inner'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {currentSector === link.sector && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Actions & Accessibility toggles */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Reduced motion quick button */}
            <button
              type="button"
              onClick={onToggleReducedMotion}
              title={reducedMotion ? 'Enable Galaxy Rotation' : 'Reduce Scene Motion'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                reducedMotion
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-purple-300 hover:border-purple-500/30'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${reducedMotion ? '' : 'text-purple-400 animate-pulse'}`} />
              <span>{reducedMotion ? 'Motion: Off' : 'Motion: Dynamic'}</span>
            </button>

            {/* CTA Button */}
            <a
              href="#telemetry"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-purple-700/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Console</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleReducedMotion}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-purple-300"
              aria-label="Toggle motion"
            >
              <Radio className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-2xl glass-panel-elevated animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectSector(link.sector);
                    setMobileMenuOpen(false);
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    currentSector === link.sector
                      ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{link.label}</span>
                  <Compass className="w-4 h-4 text-purple-400 opacity-60" />
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#telemetry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-purple-700/30"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Console</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
