import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryId, MenuItem } from '../types';
import { Search, Sparkles, Coffee, Heart, Plus, Filter, Flame, Clock } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  selectedCategory?: CategoryId | 'all';
  setSelectedCategory?: (category: CategoryId | 'all') => void;
  activeTag?: string | null;
  setActiveTag?: (tag: string | null) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
  selectedCategory: externalCategory,
  setSelectedCategory: externalSetCategory,
  activeTag: externalTag,
  setActiveTag: externalSetTag,
}) => {
  const [internalCategory, setInternalCategory] = useState<CategoryId | 'all'>('all');
  const [internalTag, setInternalTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = externalCategory !== undefined ? externalCategory : internalCategory;
  const setSelectedCategory = externalSetCategory || setInternalCategory;

  const activeTag = externalTag !== undefined ? externalTag : internalTag;
  const setActiveTag = externalSetTag || setInternalTag;

  const categories: { id: CategoryId | 'all'; label: string; icon?: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'combos', label: 'Combos Work' },
    { id: 'cafes', label: 'Cafés & Lattes' },
    { id: 'chas', label: 'Chás & Matcha' },
    { id: 'salgados', label: 'Bakes & Toasts' },
    { id: 'doces', label: 'Choux & Sobremesas' },
    { id: 'graos', label: 'Grãos Especiais' },
  ];

  const tags = [
    { id: 'destaque', label: 'Destaques' },
    { id: 'vegano', label: 'Vegano' },
    { id: 'sem-gluten', label: 'Sem Glúten' },
    { id: 'gelado', label: 'Gelados' },
  ];

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !activeTag || (item.tags && item.tags.includes(activeTag as any));

    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <section id="menu" className="py-12 sm:py-16 bg-white dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Crisp Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300 bg-stone-100 dark:bg-stone-900 px-3.5 py-1 rounded-full border border-stone-200 dark:border-stone-800">
            CARDÁPIO DE SELEÇÃO
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-stone-950 dark:text-white mt-3 mb-2">
            Escolha sua experiência
          </h2>
        </div>

        {/* Search & Shortcut Filter Bar */}
        <div className="bg-[#fafafa] dark:bg-stone-900/90 p-3 sm:p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 mb-8 max-w-3xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por choux, salted cream, matcha, toast..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400 text-xs font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(activeTag === tag.id ? null : tag.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeTag === tag.id
                    ? 'bg-stone-950 dark:bg-amber-400 text-white dark:text-stone-950 shadow-xs'
                    : 'bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-stone-950 dark:bg-amber-400 text-white dark:text-stone-950 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-transparent'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#fafafa] rounded-3xl border border-dashed border-stone-200 max-w-md mx-auto">
            <Coffee className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-900 font-bold">Nenhum item encontrado com este filtro</p>
            <p className="text-xs text-stone-500 mt-1">
              Tente redefinir a busca para ver todas as deliciosas opções do menu.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTag(null);
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2.5 bg-stone-950 text-white rounded-full text-xs font-bold"
            >
              Mostrar Todo o Cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="we-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Tags on Image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags?.includes('destaque') && (
                        <span className="bg-stone-950 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          ⭐ Favorito We
                        </span>
                      )}
                      {item.tags?.includes('vegano') && (
                        <span className="bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          Vegano
                        </span>
                      )}
                      {item.tags?.includes('sem-gluten') && (
                        <span className="bg-amber-700 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          Sem Glúten
                        </span>
                      )}
                    </div>

                    {/* Price Tag Badge */}
                    <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-950 dark:text-amber-300 font-bold text-sm px-3.5 py-1 rounded-full border border-stone-200/80 dark:border-stone-800 shadow-sm">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-stone-950 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4 line-clamp-2 font-normal">
                      {item.description}
                    </p>

                    {/* Coffee Intensity / Time Metadata */}
                    <div className="flex items-center gap-4 text-[11px] text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                      {item.intensity && (
                        <span className="flex items-center gap-1 font-medium">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>Intensidade: <strong>{item.intensity}/5</strong></span>
                        </span>
                      )}
                      {item.prepTime && (
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{item.prepTime}</span>
                        </span>
                      )}
                      {item.calories && (
                        <span className="text-stone-400 ml-auto">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-[#fafafa] border-t border-stone-100 flex items-center justify-between gap-3">
                  {item.customizable ? (
                    <button
                      onClick={() => onSelectItem(item)}
                      className="w-full py-2.5 px-4 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Personalizar Item</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onQuickAdd(item)}
                      className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-stone-900" />
                      <span>Adicionar ao Pedido</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
