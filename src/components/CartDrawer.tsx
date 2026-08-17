import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Bike, Store } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onOpenCheckout: (deliveryType: 'retirada' | 'entrega', discountAmount: number, couponApplied: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, cart) => acc + cart.totalPrice, 0);

  // Discount calculation
  let discount = 0;
  let discountPercentage = 0;
  if (appliedCoupon === 'BEMVINDO15' || appliedCoupon === 'CAFE15') {
    discountPercentage = 15;
    discount = subtotal * 0.15;
  } else if (appliedCoupon === 'CAFE10') {
    discountPercentage = 10;
    discount = subtotal * 0.10;
  }

  // Delivery fee
  const deliveryFee = deliveryType === 'entrega' ? (subtotal > 60 ? 0 : 6.00) : 0;

  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'BEMVINDO15' || code === 'CAFE15' || code === 'CAFE10') {
      setAppliedCoupon(code);
    } else {
      alert('Cupom inválido. Use o cupom BEMVINDO15 para 15% de desconto!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 transition-colors duration-300">
          
          {/* Header */}
          <div className="p-5 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-950 dark:text-amber-300" />
              <h2 className="text-lg font-bold font-display text-stone-950 dark:text-white">
                Seu Pedido ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
              id="btn-close-cart-drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Method Toggle */}
          <div className="p-4 bg-[#fafafa] dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800">
            <p className="text-xs font-semibold text-stone-600 mb-2">Como deseja receber?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeliveryType('retirada')}
                className={`py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  deliveryType === 'retirada'
                    ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Retirada Balcão</span>
              </button>
              <button
                onClick={() => setDeliveryType('entrega')}
                className={`py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  deliveryType === 'entrega'
                    ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Entrega Local</span>
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-300" />
                <p className="font-bold font-display text-stone-900">Seu carrinho está vazio</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore nosso cardápio e adicione bebidas especiais, doces icônicos e salgados.
                </p>
              </div>
            ) : (
              cartItems.map((cart) => (
                <div
                  key={cart.cartId}
                  className="bg-[#fafafa] p-4 rounded-2xl border border-stone-200 flex gap-3.5 items-start"
                >
                  <img
                    src={cart.item.image}
                    alt={cart.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-stone-950 font-display truncate">
                        {cart.item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(cart.cartId)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remover do carrinho"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details Summary */}
                    {cart.customization && (
                      <div className="text-[11px] text-stone-500 mt-1 space-y-0.5 font-medium">
                        {cart.customization.milk && (
                          <p>• Leite: {cart.customization.milk}</p>
                        )}
                        {cart.customization.sweetness && (
                          <p>• Açúcar: {cart.customization.sweetness}</p>
                        )}
                        {cart.customization.extraShot && (
                          <p className="text-stone-900 font-semibold">• Shot Extra Espresso (+R$ 4,00)</p>
                        )}
                        {cart.customization.whippedCream && (
                          <p className="text-stone-900 font-semibold">• Salted Cream (+R$ 2,50)</p>
                        )}
                        {cart.customization.notes && (
                          <p className="italic text-stone-600">"{cart.customization.notes}"</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold font-display text-stone-950">
                        R$ {cart.totalPrice.toFixed(2).replace('.', ',')}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-stone-200">
                        <button
                          onClick={() => onUpdateQuantity(cart.cartId, cart.quantity - 1)}
                          className="text-stone-600 hover:text-stone-950 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-950 min-w-4 text-center font-display">
                          {cart.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cart.cartId, cart.quantity + 1)}
                          className="text-stone-600 hover:text-stone-950 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="CUPOM (ex: BEMVINDO15)"
                    className="w-full pl-8 pr-3 py-2 rounded-full bg-[#fafafa] border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition-colors cursor-pointer border border-stone-200"
                >
                  Aplicar
                </button>
              </form>

              {appliedCoupon && (
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
                  <span>✓ Cupom <strong>{appliedCoupon}</strong> aplicado (-{discountPercentage}%)</span>
                </div>
              )}

              {/* Price Rows */}
              <div className="text-xs space-y-1.5 pt-2 border-t border-stone-100 text-stone-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Desconto Cupom:</span>
                    <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxa de Entrega ({deliveryType === 'entrega' ? 'Local' : 'Retirada'}):</span>
                  <span>
                    {deliveryType === 'retirada'
                      ? 'Grátis'
                      : deliveryFee === 0
                      ? 'Grátis (Pedido > R$60)'
                      : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200 font-display">
                  <span>Total Final:</span>
                  <span className="text-stone-950 text-base font-bold">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() =>
                  onOpenCheckout(deliveryType, discount, appliedCoupon || '')
                }
                className="w-full py-3.5 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                id="btn-cart-checkout"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
