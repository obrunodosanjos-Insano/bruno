import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Heart, ShieldCheck, Phone, Mail, Navigation, Star, Check, Zap, Dog, Car } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');

  const addressText = 'Pontão do Lago Sul - SHIS QL 10, Lote 1/30 - Brasília - DF';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Mariana Silva',
      role: 'Estudante de Medicina',
      rating: 5,
      text: 'Ambiente sensacional para focar o dia todo. O Salted Cream Cold Brew é imperdível e o Choux de Pistache é de nível internacional.',
      date: 'Há 2 dias'
    },
    {
      name: 'Lucas Rocha',
      role: 'Desenvolvedor Software',
      rating: 5,
      text: 'Design minimalista impecável, tomadas em cada mesa, Wi-Fi super rápido e atendimento extremamente atencioso.',
      date: 'Há 1 semana'
    },
    {
      name: 'Camila & Thor',
      role: 'Clientes de Fim de Semana',
      rating: 5,
      text: 'A varanda com vista é super acolhedora e aceita pets. Virou nossa parada obrigatória todo sábado!',
      date: 'Há 2 semanas'
    }
  ]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = {
      name: name.trim(),
      role: role.trim() || 'Cliente Tostado',
      rating: rating,
      text: comment.trim(),
      date: 'Agora mesmo'
    };

    setReviewsList([newReview, ...reviewsList]);
    setFeedbackSubmitted(true);
    setName('');
    setRole('');
    setComment('');
    setRating(5);

    setTimeout(() => {
      setFeedbackSubmitted(false);
      setShowFeedbackForm(false);
    }, 3500);
  };

  return (
    <section id="localizacao" className="py-12 sm:py-16 bg-white dark:bg-[#141210] text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-3.5 py-1 rounded-full border border-stone-200 dark:border-stone-700">
            LOCALIZAÇÃO & CONTATO
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-950 dark:text-stone-50 mt-3 mb-2">
            Venha nos visitar no Pontão do Lago Sul
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
          
          {/* Location & Hours Card */}
          <div className="lg:col-span-5 bg-[#fafafa] dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-5">
            <div>
              <h3 className="text-base font-bold font-display text-stone-950 dark:text-stone-50 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-stone-900 dark:text-amber-300" />
                <span>Endereço</span>
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed font-display">
                {addressText}
              </p>
              <button
                onClick={handleCopyAddress}
                className="mt-3 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-900 dark:text-stone-100 text-[11px] font-bold transition-colors cursor-pointer border border-stone-200 dark:border-stone-700 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Navigation className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300" />}
                <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                <span>Horários de Funcionamento</span>
              </h4>
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-medium">
                <div className="flex justify-between border-b border-stone-200/60 dark:border-stone-800 pb-1">
                  <span>Segunda a Sexta:</span>
                  <span className="font-bold text-stone-950 dark:text-stone-100">07:00 às 20:00</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/60 dark:border-stone-800 pb-1">
                  <span>Sábados:</span>
                  <span className="font-bold text-stone-950 dark:text-stone-100">08:00 às 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos & Feriados:</span>
                  <span className="font-bold text-stone-950 dark:text-stone-100">08:00 às 18:00</span>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-2">
                Comodidades do Espaço:
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-1.5 bg-white dark:bg-stone-850 dark:bg-stone-800 p-2 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Wifi className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300 shrink-0" />
                  <span>Wi-Fi 500MB</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-stone-850 dark:bg-stone-800 p-2 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Zap className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300 shrink-0" />
                  <span>Tomadas</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-stone-850 dark:bg-stone-800 p-2 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Dog className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300 shrink-0" />
                  <span>Pet Friendly</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-stone-850 dark:bg-stone-800 p-2 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Car className="w-3.5 h-3.5 text-stone-900 dark:text-amber-300 shrink-0" />
                  <span>Estacionamento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-stone-950 dark:text-stone-50 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Avaliações dos Clientes</span>
              </h3>
              <button
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                className="px-3 py-1.5 rounded-full bg-stone-950 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-amber-300 dark:text-amber-600 fill-amber-300 dark:fill-amber-600" />
                <span>{showFeedbackForm ? 'Fechar Formulário' : 'Deixar Feedback'}</span>
              </button>
            </div>

            {/* Interactive Customer Feedback Form */}
            {showFeedbackForm && (
              <div className="bg-stone-900 dark:bg-[#1f1b18] text-white p-5 rounded-2xl space-y-3 border border-stone-800 dark:border-stone-700 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between border-b border-stone-800 dark:border-stone-700 pb-2">
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Enviar sua Avaliação</span>
                  </h4>
                  <span className="text-[10px] text-stone-400">Sua opinião é muito importante</span>
                </div>

                {feedbackSubmitted ? (
                  <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center space-y-1">
                    <p className="text-emerald-300 font-bold text-xs">✓ Feedback enviado com sucesso!</p>
                    <p className="text-emerald-200/80 text-[11px]">Muito obrigado por avaliar o Tostado Coffee & Workspace.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitFeedback} className="space-y-3 text-xs">
                    {/* Star Rating Picker */}
                    <div>
                      <label className="text-[11px] font-medium text-stone-300 block mb-1.5">
                        Sua nota (1 a 5 estrelas):
                      </label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starIndex) => {
                          const isFilled = starIndex <= (hoverRating || rating);
                          return (
                            <button
                              key={starIndex}
                              type="button"
                              onClick={() => setRating(starIndex)}
                              onMouseEnter={() => setHoverRating(starIndex)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                              aria-label={`Classificar ${starIndex} estrelas`}
                            >
                              <Star
                                className={`w-6 h-6 transition-colors ${
                                  isFilled
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-stone-600 fill-stone-700'
                                }`}
                              />
                            </button>
                          );
                        })}
                        <span className="text-[11px] font-bold text-amber-300 ml-2">
                          {hoverRating || rating} / 5 estrelas
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-medium text-stone-300 block mb-1">
                          Seu Nome *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: João Souza"
                          className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-stone-300 block mb-1">
                          Profissão ou Vínculo (Opcional)
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Ex: Cliente Frequente / Designer"
                          className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-medium text-stone-300 block mb-1">
                        Seu Comentário / Feedback *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Conte como foi sua experiência, o café, atendimento ou ambiente..."
                        className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowFeedbackForm(false)}
                        className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-[11px] transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
                        <span>Publicar Avaliação</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            <div className="space-y-2.5">
              {reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-[#fafafa] dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs font-display text-stone-950 dark:text-stone-100">{rev.name}</h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400">{rev.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, starIdx) => (
                          <Star key={starIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Map GPS Box */}
            <div className="bg-[#fafafa] dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 flex items-center justify-center shrink-0 font-bold text-[10px] tracking-wider">
                  GPS
                </div>
                <div>
                  <p className="text-xs font-bold font-display text-stone-950 dark:text-stone-100">Trace sua rota</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">Pontão do Lago Sul - Brasília</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <a
                  href="https://maps.google.com/?q=Pontao+do+Lago+Sul+Brasilia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-full text-[11px] font-bold hover:bg-stone-100 dark:hover:bg-stone-750 cursor-pointer"
                >
                  Maps
                </a>
                <a
                  href="https://waze.com/ul?q=Pontao%20do%20Lago%20Sul%20Brasilia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 rounded-full text-[11px] font-bold hover:bg-stone-800 dark:hover:bg-white cursor-pointer"
                >
                  Waze
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
