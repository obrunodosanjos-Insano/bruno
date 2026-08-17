import React, { useState } from 'react';
import { Gift, Award, Sparkles, CheckCircle2, HeartHandshake, Coffee } from 'lucide-react';

export const LoyaltySection: React.FC = () => {
  const [weeklyCoffees, setWeeklyCoffees] = useState<number>(3);
  const [registered, setRegistered] = useState(false);
  const [phone, setPhone] = useState('');

  // 10 pts per R$ 1 spent (average coffee ~ R$ 18 => 180 pts per coffee)
  const monthlyPoints = weeklyCoffees * 4 * 180;
  const yearlyPoints = monthlyPoints * 12;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setRegistered(true);
  };

  return (
    <section id="fidelidade" className="py-12 sm:py-16 bg-[#fafafa] text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 bg-stone-100 px-3.5 py-1 rounded-full border border-stone-200">
            WE CLUB FIDELIDADE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-950 mt-3 mb-2">
            Acumule pontos e ganhe recompensas
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-4xl mx-auto">
          
          {/* Points Calculator Card */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-stone-900 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                <span>Simulador de Pontos</span>
              </div>
              <h3 className="text-base font-bold font-display text-stone-950 mb-3">
                Frequência de cafés semanais:
              </h3>

              {/* Slider */}
              <div className="space-y-3 my-4">
                <div className="flex items-center justify-between font-bold text-stone-900 text-xs">
                  <span className="text-[11px] text-stone-500">Cafés por semana:</span>
                  <span className="text-xs font-bold text-stone-950 bg-stone-100 px-3 py-0.5 rounded-full border border-stone-200">
                    {weeklyCoffees} {weeklyCoffees === 1 ? 'visita' : 'visitas'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={weeklyCoffees}
                  onChange={(e) => setWeeklyCoffees(Number(e.target.value))}
                  className="w-full accent-stone-950 cursor-pointer h-2 bg-stone-200 rounded-lg"
                />
              </div>

              {/* Calculated Results */}
              <div className="p-3.5 bg-[#fafafa] rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Pontos estimados no mês:</span>
                  <span className="font-bold text-stone-950">{monthlyPoints.toLocaleString('pt-BR')} pts</span>
                </div>
                <div className="flex justify-between text-stone-950 font-bold text-xs pt-1.5 border-t border-stone-200">
                  <span>Estimado em 1 ano:</span>
                  <span className="text-stone-950 font-bold">{yearlyPoints.toLocaleString('pt-BR')} pontos</span>
                </div>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="pt-3 border-t border-stone-100">
              {!registered ? (
                <form onSubmit={handleRegister} className="space-y-2">
                  <label className="text-[11px] font-medium text-stone-600 block">
                    Ative seu cartão We Club com WhatsApp e ganhe 100pts bônus:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(61) 99999-9999"
                      className="flex-1 px-3.5 py-2 rounded-full border border-stone-200 bg-white text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer shrink-0"
                    >
                      Ativar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cartão ativado para <strong>{phone}</strong> com 100 pts!</span>
                </div>
              )}
            </div>
          </div>

          {/* Rewards Tiers List */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-900 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Gift className="w-3.5 h-3.5 text-stone-900" />
                <span>Resgates Principais</span>
              </div>
              <h3 className="text-base font-bold font-display text-stone-950 mb-4">
                Troque seus pontos por itens do menu:
              </h3>

              <div className="space-y-2">
                {[
                  { pts: '300 pts', title: 'Espresso Especial ou Iced Tea', icon: '☕' },
                  { pts: '600 pts', title: 'Choux Cream de Pistache ou Salted Latte', icon: '🧁' },
                  { pts: '1.200 pts', title: 'Pacote de Grãos Especial Tostado (250g)', icon: '🫘' },
                  { pts: '2.500 pts', title: 'Kit Exclusivo Caneca We + Coador V60', icon: '🎁' },
                ].map((reward, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#fafafa] rounded-2xl border border-stone-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{reward.icon}</span>
                      <span className="text-xs font-semibold text-stone-800 font-display">
                        {reward.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-stone-950 bg-white px-2.5 py-0.5 rounded-full border border-stone-200 shrink-0">
                      {reward.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-stone-400 mt-4 pt-3 border-t border-stone-100">
              * Informe seu WhatsApp ao pedir no aplicativo ou balcão para somar pontos.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
