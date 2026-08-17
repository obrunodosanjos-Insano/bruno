import React, { useState } from 'react';
import { BREWING_METHODS } from '../data/menuData';
import { Coffee, Droplet, Flame, Wine, Sparkles, Clock, Scale, Compass } from 'lucide-react';

export const CoffeeMethods: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState(BREWING_METHODS[0].id);

  const selectedMethod = BREWING_METHODS.find((m) => m.id === selectedMethodId) || BREWING_METHODS[0];

  return (
    <section id="metodos" className="py-12 sm:py-16 bg-white text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-stone-900" />
            <span>MÉTODOS DE EXTRAÇÃO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-950 mt-3 mb-2">
            Como você prefere o seu café?
          </h2>
        </div>

        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-8">
          {BREWING_METHODS.map((method) => {
            const isSelected = method.id === selectedMethodId;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-stone-950 text-white border-stone-950 font-bold shadow-xs'
                    : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span className="text-xs font-display font-semibold">{method.name}</span>
              </button>
            );
          })}
        </div>

        {/* Method Detail Card Showcase */}
        <div className="bg-[#fafafa] rounded-3xl p-6 sm:p-8 border border-stone-200/80 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xs h-48 md:h-full min-h-[180px]">
            <img
              src={selectedMethod.image}
              alt={selectedMethod.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-bold text-stone-900 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-stone-200">
              {selectedMethod.flavorProfile}
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xl font-bold font-display text-stone-950 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-stone-900" />
              <span>{selectedMethod.name}</span>
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {selectedMethod.description}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-[11px]">
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-900 font-bold block mb-0.5">Moagem</span>
                <span className="text-stone-600 text-[10px]">{selectedMethod.grind}</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-900 font-bold block mb-0.5">Proporção</span>
                <span className="text-stone-600 text-[10px]">{selectedMethod.ratio}</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-900 font-bold block mb-0.5">Tempo</span>
                <span className="text-stone-600 text-[10px]">{selectedMethod.time}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
