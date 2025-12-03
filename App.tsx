import React, { useState } from 'react';
import { HeroCard } from './components/HeroCard';
import { DetailView } from './components/DetailView';
import { HEROES } from './constants';
import { Hero } from './types';
import { Skull, AlertTriangle, Zap, Crosshair, Barcode } from 'lucide-react';

const App: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [flippedHeroId, setFlippedHeroId] = useState<string | null>(null);

  const handleHeroSelect = (hero: Hero) => {
    // 1. Trigger Flip Animation
    setFlippedHeroId(hero.id);
    
    // 2. Wait for flip to complete (approx 600ms matching CSS duration) then show modal
    setTimeout(() => {
      setSelectedHero(hero);
    }, 600);
  };

  const handleBack = () => {
    setSelectedHero(null);
    // Add a slight delay before un-flipping to make the modal exit feel natural
    setTimeout(() => {
      setFlippedHeroId(null);
    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-[#ccff00] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] relative overflow-x-hidden font-sans">
      
      {/* Decorative Corner Elements */}
      <div className="fixed top-6 left-6 z-0 opacity-50 pointer-events-none">
        <Crosshair size={48} strokeWidth={1} />
      </div>
      <div className="fixed top-6 right-6 z-0 opacity-50 pointer-events-none hidden md:block">
        <div className="flex gap-2">
           <div className="w-4 h-4 bg-black"></div>
           <div className="w-4 h-4 border-2 border-black"></div>
           <div className="w-4 h-4 bg-black"></div>
        </div>
      </div>

      {/* Header */}
      <header className="pt-20 pb-16 text-center relative z-10 flex flex-col items-center">
        
        {/* Top Label */}
        <div className="mb-4 border border-black bg-white px-3 py-1 text-xs font-mono tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
           Collection 2025 // Vol. 1
        </div>

        <div className="relative">
           {/* Main Title Box */}
           <div className="bg-white border-4 border-black px-12 py-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
              <h1 className="text-5xl md:text-7xl font-black heading-font tracking-tight uppercase text-black leading-none">
                请选择<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">你的英雄</span>
              </h1>
              
              <div className="absolute -top-6 -left-6 bg-black text-white px-3 py-1 font-mono text-sm rotate-[-4deg]">
                 CHOOSE WISELY
              </div>
           </div>
           
           {/* Decorative Underlay */}
           <div className="absolute top-0 left-0 w-full h-full bg-purple-500 border-4 border-black transform translate-x-3 translate-y-3 z-0"></div>
        </div>
        
        {/* Modern Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-transparent border-2 border-black px-6 py-2 rounded-full font-bold text-lg hover:bg-black hover:text-[#ccff00] transition-colors cursor-default flex items-center gap-2">
            <Skull size={18} /> 奇葩朋友
          </div>
          <div className="bg-transparent border-2 border-black px-6 py-2 rounded-full font-bold text-lg hover:bg-black hover:text-[#ccff00] transition-colors cursor-default flex items-center gap-2">
            <AlertTriangle size={18} /> 纯属虚构
          </div>
          <div className="bg-transparent border-2 border-black px-6 py-2 rounded-full font-bold text-lg hover:bg-black hover:text-[#ccff00] transition-colors cursor-default flex items-center gap-2">
            <Zap size={18} /> 禁止急眼
          </div>
        </div>
      </header>

      {/* Grid Container */}
      <main className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 items-start">
          {HEROES.map((hero, index) => (
            <div 
              key={hero.id} 
              className={`w-full flex justify-center transition-transform duration-500 ${index % 2 !== 0 ? 'lg:translate-y-16' : ''}`}
            >
              <HeroCard 
                hero={hero} 
                isSelected={flippedHeroId === hero.id}
                onSelect={handleHeroSelect}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white border-t-4 border-black py-4 z-40">
         <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 overflow-hidden">
            <div className="flex items-center gap-2 font-mono text-xs md:text-sm font-bold opacity-60">
               <Barcode size={24} />
               <span>SYSTEM STATUS: ONLINE</span>
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 overflow-hidden mask-linear">
               <div className="animate-marquee whitespace-nowrap font-mono text-sm font-bold text-red-600">
                  ⚠️ WARNING: EXTREME CRINGE LEVELS DETECTED ⚠️ FRIENDSHIP MAY BE TERMINATED ⚠️ PROCEED WITH CAUTION
               </div>
            </div>

            <div className="font-mono text-xs md:text-sm font-bold opacity-60">
               V.1.0.2
            </div>
         </div>
      </footer>

      {/* Detail Modal Overlay */}
      {selectedHero && (
        <DetailView hero={selectedHero} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;