import React from 'react';
import { Sparkles, ArrowRight, Star, MapPin, Calendar, Flame, Laptop, Gift, Cake, Wifi } from 'lucide-react';
import { TostadoLogoIcon } from './TostadoLogoIcon';
import heroMinimalImg from '../assets/images/wecoffee_minimal_hero_1786642461097.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
  onSelectCategory?: (category: string) => void;
  onSelectTag?: (tag: string) => void;
  onSelectSection?: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenReservation,
  onSelectCategory,
  onSelectTag,
  onSelectSection,
}) => {
  const navigateSection = (id: string) => {
    if (onSelectSection) onSelectSection(id);
    const el = document.getElementById('main-content-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#fafafa] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 overflow-hidden py-10 lg:py-16 border-b border-stone-200/60 dark:border-stone-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-amber-300 text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-stone-900 dark:text-amber-400" />
              <span>We Coffee & Tostado • Pontão Lago Sul</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-950 dark:text-white leading-tight tracking-tight">
              Cafés especiais, confeitaria fina e ambiente de foco.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              O espaço minimalista ideal para o seu trabalho, estudo ou pausa no Pontão do Lago Sul.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onExploreMenu}
                className="px-7 py-3 rounded-full bg-stone-950 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                id="btn-hero-menu"
              >
                <span>Ver Cardápio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReservation}
                className="px-7 py-3 rounded-full bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
                id="btn-hero-reservation"
              >
                <Calendar className="w-4 h-4 text-stone-900 dark:text-amber-400" />
                <span>Reservar Mesa</span>
              </button>
            </div>

            {/* Quick Shortcuts Grid (Atalhos Rápidos) */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3 text-center lg:text-left font-display">
                Atalhos Rápidos:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onExploreMenu();
                    if (onSelectTag) onSelectTag('destaque');
                  }}
                  className="px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="truncate">Mais Pedidos</span>
                </button>

                <button
                  onClick={() => {
                    onExploreMenu();
                    if (onSelectCategory) onSelectCategory('combos');
                  }}
                  className="px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <Laptop className="w-4 h-4 text-stone-900 dark:text-amber-400 shrink-0" />
                  <span className="truncate">Combos Work</span>
                </button>

                <button
                  onClick={() => {
                    onExploreMenu();
                    if (onSelectCategory) onSelectCategory('doces');
                  }}
                  className="px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <Cake className="w-4 h-4 text-stone-900 dark:text-amber-400 shrink-0" />
                  <span className="truncate">Choux & Doces</span>
                </button>

                <button
                  onClick={() => navigateSection('espaco')}
                  className="px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <Wifi className="w-4 h-4 text-stone-900 dark:text-amber-400 shrink-0" />
                  <span className="truncate">Wi-Fi & Mesas</span>
                </button>

                <button
                  onClick={() => navigateSection('localizacao')}
                  className="px-3 py-2 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-900 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <MapPin className="w-4 h-4 text-stone-900 shrink-0" />
                  <span className="truncate">Como Chegar</span>
                </button>

                <button
                  onClick={() => navigateSection('fidelidade')}
                  className="px-3 py-2 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-900 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer text-left"
                >
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">Clube 100pts</span>
                </button>
              </div>
            </div>

          </div>

          {/* Clean Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="we-card rounded-3xl overflow-hidden p-2 bg-white relative shadow-md">
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden">
                  <img
                    src={heroMinimalImg}
                    alt="Coleção Minimalista We Coffee Tostado"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


