import React, { useState } from 'react';
import { Heart, Send, Check, MapPin, Phone, Mail } from 'lucide-react';
import { TostadoLogoIcon } from './TostadoLogoIcon';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 text-xs border-t border-stone-800">
      
      {/* Newsletter Bar */}
      <div className="border-b border-stone-800 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold font-serif text-stone-100">
              Receba ofertas exclusivas & avisos de torras frescas
            </h3>
            <p className="text-xs text-stone-400">
              Cadastre seu e-mail e receba o cupom de 10% de desconto para o seu próximo café.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Inscrever</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Inscrição realizada! Use o cupom <strong className="text-emerald-200">CAFE10</strong> no seu carrinho.</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-stone-950 font-bold">
              <TostadoLogoIcon className="w-5 h-5 text-stone-950" />
            </div>
            <span className="text-lg font-bold font-display text-amber-100 uppercase tracking-wide">
              El Grano
            </span>
          </div>
          <p className="text-amber-300/80 leading-relaxed">
            Cafeteria artesanal e espaço de trabalho. Paixão por café de verdade, ambiente acolhedor, Wi-Fi rápido e comida de qualidade.
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <h4 className="font-bold text-amber-100 uppercase tracking-wider text-[11px]">Navegação</h4>
          <ul className="space-y-1.5 text-amber-300/80">
            <li><a href="#menu" className="hover:text-amber-100 transition-colors">Cardápio de Cafés</a></li>
            <li><a href="#espaco" className="hover:text-amber-100 transition-colors">O Espaço (Trabalho & Estudos)</a></li>
            <li><a href="#fidelidade" className="hover:text-amber-100 transition-colors">Clube El Grano (Fidelidade)</a></li>
            <li><a href="#localizacao" className="hover:text-amber-100 transition-colors">Localização & Contato</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <h4 className="font-bold text-amber-100 uppercase tracking-wider text-[11px]">Contato & Atendimento</h4>
          <p className="text-amber-300/80 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Centro da Cidade (Pontão do Lago Sul) - Brasília - DF</span>
          </p>
          <p className="text-amber-300/80 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>WhatsApp: (61) 98888-7777</span>
          </p>
          <p className="text-amber-300/80 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>contato@elgranocafe.com.br</span>
          </p>
        </div>

        {/* Col 4 */}
        <div className="space-y-2">
          <h4 className="font-bold text-amber-100 uppercase tracking-wider text-[11px]">Redes Sociais</h4>
          <div className="flex items-center gap-3">
            {['Instagram', 'Facebook', 'WhatsApp'].map((net) => (
              <span
                key={net}
                className="px-3 py-1.5 rounded-lg bg-amber-900/60 border border-amber-800 text-amber-200 hover:bg-amber-800 cursor-pointer text-[11px] font-medium"
              >
                {net}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-amber-900/60 py-4 text-center text-amber-400/60 text-[11px]">
        <p>© {new Date().getFullYear()} El Grano - Cafeteria & Espaço de Trabalho. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
