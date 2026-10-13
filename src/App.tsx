import React, { useState, useEffect } from 'react';
import { GalaxyScene, GalaxySector } from './components/GalaxyScene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TelemetrySection } from './components/TelemetrySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { GalaxyControls } from './components/GalaxyControls';

export const App: React.FC = () => {
  const [sector, setSector] = useState<GalaxySector>('overview');
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [starDensity, setStarDensity] = useState<'low' | 'medium' | 'high'>('high');

  // Listen to OS-level prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const handleExploreHero = () => {
    setSector('core');
    const elem = document.querySelector('#sectors');
    if (elem) {
      elem.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* 3D WebGL Galaxy Scene Background */}
      <GalaxyScene
        reducedMotion={reducedMotion}
        sector={sector}
        speedMultiplier={speedMultiplier}
        starDensity={starDensity}
      />

      {/* Ambient Vignette & Cosmic Gradient Glow Overlays (subtle, non-distracting) */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(217,70,239,0.08),rgba(0,0,0,0))]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-transparent via-[#030014]/20 to-[#030014]/90"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Navigation */}
      <Navbar
        currentSector={sector}
        onSelectSector={setSector}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Main Page Content */}
      <main className="relative z-10 flex flex-col">
        <HeroSection
          onExplore={handleExploreHero}
          onSelectSector={setSector}
        />

        <FeaturesSection
          onSelectSector={setSector}
        />

        <TelemetrySection
          currentSector={sector}
          onSelectSector={setSector}
        />

        <ArchitectureSection />

        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Interactive Galaxy Viewport Controller */}
      <GalaxyControls
        sector={sector}
        onSelectSector={setSector}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        speed={speedMultiplier}
        onSetSpeed={setSpeedMultiplier}
        starDensity={starDensity}
        onSetDensity={setStarDensity}
      />

    </div>
  );
};

export default App;
