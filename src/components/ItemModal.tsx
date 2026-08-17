import React, { useState } from 'react';
import { MenuItem, CustomizationOption } from '../types';
import { X, Plus, Minus, Coffee, Sparkles, Check } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CustomizationOption, quantity: number) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [milk, setMilk] = useState<CustomizationOption['milk']>('integral');
  const [sweetness, setSweetness] = useState<CustomizationOption['sweetness']>('normal');
  const [extraShot, setExtraShot] = useState(false);
  const [whippedCream, setWhippedCream] = useState(false);
  const [temperature, setTemperature] = useState<CustomizationOption['temperature']>('quente');
  const [notes, setNotes] = useState('');

  // Calculate extra cost
  let extraCost = 0;
  if (milk === 'aveia' || milk === 'amendoas') extraCost += 3.00;
  if (extraShot) extraCost += 4.00;
  if (whippedCream) extraCost += 2.50;

  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      item,
      {
        milk: item.category === 'cafes' || item.category === 'chas' ? milk : undefined,
        sweetness: item.category === 'cafes' || item.category === 'chas' ? sweetness : undefined,
        extraShot: item.category === 'cafes' ? extraShot : undefined,
        temperature: item.category === 'cafes' || item.category === 'chas' ? temperature : undefined,
        whippedCream: item.category === 'cafes' ? whippedCream : undefined,
        notes: notes.trim() ? notes.trim() : undefined,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-stone-900 rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="relative h-52 sm:h-60 w-full shrink-0 bg-stone-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center border border-stone-200 shadow-sm transition-colors cursor-pointer"
            id="btn-close-item-modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-stone-950 text-white uppercase tracking-wider">
              {item.category === 'cafes' ? 'Coffee & Latte' : item.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-950 mt-1.5 drop-shadow-xs bg-white/80 backdrop-blur-md p-2 rounded-2xl inline-block border border-stone-200/80">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            {item.description}
          </p>

          {/* Customization Options for Beverages */}
          {item.customizable && (item.category === 'cafes' || item.category === 'chas') && (
            <div className="space-y-4 pt-3 border-t border-stone-100">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                Personalize sua bebida
              </p>

              {/* Milk Option */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  Opção de Leite / Base:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'integral', label: 'Integral' },
                    { id: 'desnatado', label: 'Desnatado' },
                    { id: 'zero-lactose', label: 'Zero Lactose' },
                    { id: 'aveia', label: 'Leite Aveia (+R$3)' },
                    { id: 'amendoas', label: 'Amêndoas (+R$3)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMilk(opt.id as any)}
                      className={`px-3 py-2 rounded-full text-xs font-bold border text-center transition-colors cursor-pointer ${
                        milk === opt.id
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness Option */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  Açúcar / Adoçante:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'normal', label: 'Padrão' },
                    { id: 'pouco', label: 'Pouco' },
                    { id: 'sem-acucar', label: 'Sem Açúcar' },
                    { id: 'adocante', label: 'Adoçante' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSweetness(opt.id as any)}
                      className={`px-3 py-2 rounded-full text-xs font-bold border text-center transition-colors cursor-pointer ${
                        sweetness === opt.id
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              {item.category === 'cafes' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Adicionais Especiais:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraShot(!extraShot)}
                      className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                        extraShot
                          ? 'bg-stone-950 text-white border-stone-950'
                          : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>Shot Extra Espresso</span>
                      <span>+R$ 4,00</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWhippedCream(!whippedCream)}
                      className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                        whippedCream
                          ? 'bg-stone-950 text-white border-stone-950'
                          : 'bg-[#fafafa] text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>Salted Cream We</span>
                      <span>+R$ 2,50</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Observations */}
          <div className="pt-3 border-t border-stone-100">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Observações do Pedido:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Servir bem quente, colocar canela..."
              className="w-full px-4 py-2.5 rounded-full bg-[#fafafa] border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#fafafa] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-stone-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-stone-950 font-display">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 py-3 px-8 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-between cursor-pointer"
            id="btn-add-to-cart-modal"
          >
            <span>Adicionar ao Pedido</span>
            <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
