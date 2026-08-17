import React, { useState, useEffect } from 'react';
import { CartItem, UserProfile } from '../types';
import { X, CheckCircle, QrCode, CreditCard, Banknote, MapPin, User, Phone, Mail, Clock, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  deliveryType: 'retirada' | 'entrega';
  discountAmount: number;
  couponApplied: string;
  onClearCart: () => void;
  userProfile?: UserProfile | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  deliveryType,
  discountAmount,
  couponApplied,
  onClearCart,
  userProfile,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [changeFor, setChangeFor] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Auto pre-fill if profile exists
  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.deliveryStreet) {
        const fullAddr = `${userProfile.deliveryStreet}, ${userProfile.deliveryNumber || ''}${userProfile.deliveryNeighborhood ? ` - ${userProfile.deliveryNeighborhood}` : ''}`;
        setAddress(fullAddr);
      }
    }
  }, [userProfile, isOpen]);

  // Total
  const subtotal = cartItems.reduce((acc, c) => acc + c.totalPrice, 0);
  const deliveryFee = deliveryType === 'entrega' ? (subtotal > 60 ? 0 : 6.00) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Por favor, preencha seu nome e telefone de contato.');
      return;
    }
    if (deliveryType === 'entrega' && !address) {
      alert('Por favor, informe o endereço de entrega.');
      return;
    }

    // Generate order code
    const randomCode = 'WE-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(randomCode);
    setStep('confirmed');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-stone-900 rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-stone-950" />
            <h3 className="text-lg font-bold font-display text-stone-950">
              {step === 'form' ? 'Finalizar Pedido' : 'Pedido Confirmado!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 flex-1 overflow-y-auto">
            
            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-display">
                1. Seus Dados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-600 font-medium block mb-1">Nome Completo *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-stone-600 font-medium block mb-1">WhatsApp / Telefone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(61) 99999-9999"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {deliveryType === 'entrega' && (
                <div>
                  <label className="text-xs text-stone-600 font-medium block mb-1">Endereço de Entrega *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Endereço, número, bairro e complemento"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-display">
                2. Forma de Pagamento
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pix', label: 'PIX Instantâneo', icon: QrCode },
                  { id: 'cartao', label: 'Cartão', icon: CreditCard },
                  { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === item.id
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'pix' && (
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1">
                  <p className="font-bold text-stone-950">📱 Código QR PIX gerado após confirmação.</p>
                  <p className="text-[11px] text-stone-500">Aprovação imediata do pedido.</p>
                </div>
              )}

              {paymentMethod === 'dinheiro' && (
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Troco para quanto?</label>
                  <input
                    type="text"
                    value={changeFor}
                    onChange={(e) => setChangeFor(e.target.value)}
                    placeholder="Ex: R$ 50,00 ou Sem troco"
                    className="w-full px-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="p-4 bg-[#fafafa] rounded-2xl border border-stone-200 text-xs space-y-1.5 text-stone-600">
              <p className="font-bold text-stone-950 mb-2 font-display">Resumo do Pedido:</p>
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} itens):</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Desconto ({couponApplied}):</span>
                  <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxa Entrega / Retirada:</span>
                <span>{deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-950 pt-2 border-t border-stone-200 font-display">
                <span>Total Final:</span>
                <span className="text-stone-950 font-bold text-base">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              id="btn-confirm-order-submit"
            >
              Confirmar & Enviar Pedido
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                Código do Pedido: {orderNumber}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-950 mt-3">
                Pedido recebido com sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Obrigado, <strong className="text-stone-950">{name}</strong>! Nossa equipe já iniciou o preparo dos seus itens.
              </p>
            </div>

            {/* Simulated QR Code for Pix */}
            {paymentMethod === 'pix' && (
              <div className="p-5 bg-[#fafafa] text-stone-900 rounded-3xl max-w-xs mx-auto border border-stone-200 space-y-3">
                <p className="text-xs font-bold text-stone-900 font-display">Chave PIX Copia e Cola:</p>
                <div className="p-2.5 bg-white rounded-xl text-[10px] font-mono break-all text-stone-600 border border-stone-200">
                  00020126580014BR.GOV.BCB.PIX0136tostado-we-coffee-pix-key-99885204
                </div>
                <button
                  onClick={() => alert('Chave PIX copiada!')}
                  className="w-full py-2 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-stone-800"
                >
                  Copiar Chave PIX
                </button>
              </div>
            )}

            {/* Status Steps */}
            <div className="p-5 bg-[#fafafa] rounded-2xl border border-stone-200 text-left space-y-3">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wider font-display">Status em Tempo Real:</p>
              <div className="space-y-2 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>1. Pedido Confirmado</span>
                </div>
                <div className="flex items-center gap-2 text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-stone-950" />
                  <span>2. Preparo na Cozinha & Barismo (~15 min)</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <span>3. {deliveryType === 'entrega' ? 'Saiu para Entrega' : 'Pronto para Retirada'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Voltar ao Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
