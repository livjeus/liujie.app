import React, { useEffect, useState } from 'react';
import { Hero, GeneratedContent } from '../types';
import { generateFunnyBio } from '../services/geminiService';
import { ArrowLeft, RefreshCw, Play, Volume2 } from 'lucide-react';

interface DetailViewProps {
  hero: Hero;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ hero, onBack }) => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    // Reset content slightly to trigger re-render visual cues if needed
    setContent(null); 
    const data = await generateFunnyBio(hero.name, hero.baseTraits);
    setContent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-5xl h-[90vh] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none"
        >
          <ArrowLeft size={32} />
        </button>

        {/* Left Side: Visuals (Image or Video) */}
        <div className={`w-full md:w-1/2 h-1/2 md:h-full relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-${hero.colorTheme} flex items-center justify-center overflow-hidden`}>
          {hero.id === 'grumpy-bro' && hero.videoUrl ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video 
                src={hero.videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold border-2 border-white animate-pulse">
                 LIVE FOOTAGE
              </div>
            </div>
          ) : (
             <img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-cover" />
          )}
          
          {/* Name Overlay */}
          <div className="absolute bottom-8 left-0 bg-yellow-400 border-y-4 border-r-4 border-black px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            <h1 className="text-4xl md:text-5xl font-black comic-font uppercase">{hero.name}</h1>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 flex flex-col overflow-y-auto bg-slate-100 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            
            {/* Header */}
            <div className="mb-8 mt-4">
              <span className={`inline-block px-4 py-1 text-white bg-black font-mono text-sm mb-2 rotate-1`}>
                ID: {hero.id.toUpperCase()}
              </span>
              <h2 className={`text-4xl font-black text-${hero.colorTheme} uppercase leading-none`}>
                {hero.title}
              </h2>
            </div>

            {/* Dynamic Content */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <RefreshCw className="animate-spin w-12 h-12 text-black" />
                <p className="font-bold text-xl animate-pulse">AI 正在疯狂吐槽中...</p>
              </div>
            ) : content ? (
              <div className="space-y-6 flex-1">
                
                {/* Bio Box */}
                <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 transition-transform hover:rotate-0">
                  <h3 className="font-black text-xl mb-2 underline decoration-wavy decoration-pink-500">AI 毒舌点评 🔥</h3>
                  <p className="text-lg font-bold leading-relaxed font-sans text-gray-800">
                    {content.bio || "暂无数据"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   {/* Power Move */}
                   <div className="bg-blue-400 p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white transform -rotate-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Play className="fill-current w-5 h-5" />
                        <h4 className="font-black uppercase">必杀技</h4>
                      </div>
                      <p className="font-bold text-xl">{content.powerMove || "未知"}</p>
                   </div>

                   {/* Weakness */}
                   <div className="bg-red-400 p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white transform rotate-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Volume2 className="w-5 h-5" />
                        <h4 className="font-black uppercase">致命弱点</h4>
                      </div>
                      <p className="font-bold text-xl">{content.weakness || "未知"}</p>
                   </div>
                </div>

              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t-4 border-black border-dashed">
              <button 
                onClick={fetchContent}
                disabled={loading}
                className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-400 text-black font-black text-xl py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3 uppercase"
              >
                <RefreshCw className={`${loading ? 'animate-spin' : ''}`} />
                {loading ? '生成中...' : '再吐槽一次'}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};