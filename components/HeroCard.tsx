import React from 'react';
import { Hero } from '../types';
import { Ghost, Binary, Scan } from 'lucide-react';

interface HeroCardProps {
  hero: Hero;
  isSelected: boolean;
  onSelect: (hero: Hero) => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ hero, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative h-[480px] w-full max-w-[320px] cursor-pointer perspective-1000 group transition-all duration-300 hover:-translate-y-2 ${isSelected ? 'z-50' : 'z-10'}`}
      onClick={() => onSelect(hero)}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-black bg-white ${isSelected ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT SIDE */}
        <div className={`absolute w-full h-full backface-hidden flex flex-col`}>
          
          {/* Top Bar (Tech Style) */}
          <div className="h-10 border-b-4 border-black flex items-center justify-between px-3 bg-white">
             <span className="font-mono font-bold text-xs tracking-tighter">ID-{hero.id.slice(0,3).toUpperCase()}</span>
             <div className="flex gap-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
             </div>
          </div>

          {/* Image Area - NO GRAYSCALE */}
          <div className="relative flex-1 w-full overflow-hidden border-b-4 border-black group">
            <img 
              src={hero.imageUrl} 
              alt={hero.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Scanlines overlay for texture, barely visible */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/3px-tile.png')] opacity-10 pointer-events-none"></div>

            {/* Hover Overlay "SELECT" */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10 backdrop-blur-[1px]">
               <div className="bg-[#ccff00] text-black font-black text-4xl heading-font px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                  SELECT
               </div>
            </div>
          </div>
          
          {/* Text Area */}
          <div className="h-28 flex flex-col justify-center px-5 bg-white relative">
             <div className="flex items-end justify-between mb-1">
                <h3 className="text-2xl font-black uppercase heading-font tracking-tight leading-none">
                  {hero.name}
                </h3>
                <Scan size={20} className="text-gray-400" />
             </div>
             
             <div className="w-full h-px bg-gray-300 my-2"></div>
             
             <p className="text-xs font-bold uppercase tracking-widest text-gray-500 font-mono">
               Class: {hero.title}
             </p>

             {/* Decorative colored strip at bottom */}
             <div className={`absolute bottom-0 left-0 w-full h-2 bg-${hero.colorTheme}`}></div>
          </div>
        </div>

        {/* BACK SIDE (Loading/Entrance) */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-[#1a1a1a] border-4 border-black flex flex-col items-center justify-center p-6 text-[#ccff00] pixel-font`}>
           {/* Glitch Effect Text */}
           <div className="text-center relative mb-12">
             <Ghost className="w-16 h-16 mx-auto mb-4 animate-bounce" />
             <h2 className="text-4xl font-bold animate-glitch">LOADING</h2>
           </div>

           {/* Progress Bar Style */}
           <div className="w-full border-2 border-[#ccff00] p-1 mb-2 bg-black">
             <div className="h-4 bg-[#ccff00] animate-[width_1.5s_ease-in-out_infinite] w-[0%]"></div>
           </div>
           
           <div className="flex items-center justify-between w-full text-lg mt-2 font-mono">
             <span>DATA.FETCH</span>
             <Binary className="w-4 h-4 animate-spin" />
           </div>

           <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] opacity-50 font-sans text-white">
             <span>SECURE CONNECTION</span>
             <span>ENCRYPTED</span>
           </div>
        </div>
      </div>
    </div>
  );
};