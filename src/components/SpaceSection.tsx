import React from 'react';
import { Wifi, Zap, VolumeX, Users, Laptop, Sun, Coffee, BookOpen, Clock, ShieldCheck, Check, Smile } from 'lucide-react';
import industrialHeroImg from '../assets/images/tostado_industrial_hero_1786641854670.jpg';

interface SpaceSectionProps {
  onOpenReservation: () => void;
}

export const SpaceSection: React.FC<SpaceSectionProps> = ({ onOpenReservation }) => {
  const features = [
    {
      icon: <Wifi className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Wi-Fi 500MB Dedicado',
      description: 'Estrutura de alta velocidade para videochamadas sem interrupções, aulas e uploads pesados.',
    },
    {
      icon: <Zap className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Pontos de Energia Individuais',
      description: 'Réguas de tomadas, portas USB e USB-C estrategicamente instaladas em todas as mesas.',
    },
    {
      icon: <VolumeX className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Ambiente Sonoro Controlado',
      description: 'Trilha sonora ambiente em volume calibrado e isolamento acústico pensado para foco produtivo.',
    },
    {
      icon: <Users className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Bancadas & Espaços de Reunião',
      description: 'Mesas amplas de trabalho comunitário e cabines privativas para estudo solo ou reuniões de grupo.',
    },
    {
      icon: <Sun className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Iluminação Natural & Conforto',
      description: 'Projeto de iluminação indireta e aconchegante para preservar a visão durante longas horas de tela.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-stone-900 dark:text-amber-300" />,
      title: 'Especialidades de Café no Local',
      description: 'Atendimento direto na mesa com nosso cardápio completo de lattes, choux e refeições leves.',
    },
  ];

  const zones = [
    {
      title: 'Estação Foco Individual',
      description: 'Cabines privativas com iluminação direcionada, tomadas individuais e silêncio absoluto.',
      idealFor: 'Estudo concentrado, leitura e tarefas de alta complexidade',
      capacity: '1 pessoa',
      tag: 'Silêncio Absoluto',
    },
    {
      title: 'Bancada Co-Working Central',
      description: 'Bancada ampla e minimalista com conectividade total e ergonomia planejada.',
      idealFor: 'Notebooks, reuniões online e uso contínuo',
      capacity: 'Até 12 pessoas',
      tag: 'Mais Procurada',
    },
    {
      title: 'Sala de Projetos & Encontros',
      description: 'Espaço com suporte para apresentações, tela HDMI e ambiente reservado.',
      idealFor: 'Trabalhos em equipe, reuniões e alinhamentos',
      capacity: '4 a 8 pessoas',
      tag: 'Sob Reserva',
    },
  ];

  return (
    <section id="espaco" className="py-12 sm:py-16 bg-[#fafafa] dark:bg-[#141210] text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-[10px] font-bold uppercase tracking-wider">
            <Laptop className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300" />
            <span>ESTRUTURA & CO-WORKING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-950 dark:text-stone-50">
            Ambiente projetado para foco e produtividade
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xs font-bold text-stone-950 dark:text-stone-100 font-display">{feature.title}</h3>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Space Zones Showcase */}
        <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 tracking-[0.2em] uppercase bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700">
                RESERVA DE MESAS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-950 dark:text-stone-50">
                Garanta seu lugar em nossa unidade no Pontão do Lago Sul
              </h3>

              <div className="space-y-2 pt-1">
                {zones.map((zone, i) => (
                  <div key={i} className="bg-[#fafafa] dark:bg-stone-850 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-stone-950 dark:text-stone-100 font-display">{zone.title}</h4>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300">{zone.idealFor}</p>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 shrink-0">
                      {zone.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="px-6 py-3 rounded-full bg-stone-950 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-300 dark:text-stone-950" />
                  <span>Reservar Mesa Gratuitamente</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-800">
                <img 
                  src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80" 
                  alt="Espaço Minimalista El Grano" 
                  className="w-full h-64 sm:h-72 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
