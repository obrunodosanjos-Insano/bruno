import React, { useState, useEffect } from 'react';
import { ReservationDetails, UserProfile } from '../types';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle, Coffee } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile | null;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, userProfile }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const [formData, setFormData] = useState<ReservationDetails>({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    date: new Date().toISOString().split('T')[0],
    time: '15:00',
    guests: 2,
    area: 'salao',
    specialRequests: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        name: userProfile.name || prev.name,
        email: userProfile.email || prev.email,
        phone: userProfile.phone || prev.phone,
      }));
    }
  }, [userProfile, isOpen]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const code = 'WE-RES-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-stone-900 rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-stone-950" />
            <h3 className="text-lg font-bold font-display text-stone-950">
              Reserva de Mesa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleBooking} className="p-6 space-y-4 flex-1 overflow-y-auto">
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Garanta seu espaço em nossa unidade no Pontão do Lago Sul para reuniões, trabalho ou momentos especiais.
            </p>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-stone-600 font-medium block mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full px-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 font-medium block mb-1">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(61) 99999-9999"
                  className="w-full px-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-stone-600 font-medium block mb-1">E-mail para Confirmação</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            {/* Date & Time & Guests */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-stone-600 font-medium block mb-1">Data *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 font-medium block mb-1">Horário *</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900 font-bold"
                >
                  {['08:30', '10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map((t) => (
                    <option key={t} value={t}>
                      {t} h
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-600 font-medium block mb-1">Pessoas *</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900 font-bold"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Pessoa' : 'Pessoas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area Choice */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-2 font-display">
                Preferência de Ambiente:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'salao', label: 'Salão Futurista', desc: 'Claro & Moderno' },
                  { id: 'varanda', label: 'Varanda Lago', desc: 'Arejada & Pet Friendly' },
                  { id: 'silencioso', label: 'Bancada Work', desc: 'Com tomadas e alta luz' },
                  { id: 'eventos', label: 'Mesa de Grupo', desc: 'Grupos maiores' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, area: area.id as any })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      formData.area === area.id
                        ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                        : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <p className="text-xs font-bold">{area.label}</p>
                    <p className="text-[10px] opacity-80 font-normal">{area.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="text-xs text-stone-600 block mb-1">Pedidos Especiais (Opcional)</label>
              <textarea
                rows={2}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Ex: Cadeira de bebê, mesa próxima à janela..."
                className="w-full px-4 py-2.5 rounded-2xl bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
              id="btn-submit-reservation"
            >
              Confirmar Reserva de Mesa
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                Voucher de Reserva: {bookingCode}
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-950 mt-3">
                Mesa Reservada com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Esperamos por você, <strong className="text-stone-950">{formData.name}</strong>!
              </p>
            </div>

            <div className="p-5 bg-[#fafafa] rounded-2xl border border-stone-200 text-xs text-left space-y-2 text-stone-700 font-medium">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span>Data & Horário:</span>
                <span className="font-bold text-stone-950">{formData.date} às {formData.time}h</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span>Pessoas:</span>
                <span className="font-bold text-stone-950">{formData.guests} convidados</span>
              </div>
              <div className="flex justify-between">
                <span>Ambiente Escolhido:</span>
                <span className="font-bold text-stone-950 uppercase">{formData.area}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500">
              Enviamos a confirmação para o seu número {formData.phone}. Apresente este voucher ao chegar.
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Concluir & Voltar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
