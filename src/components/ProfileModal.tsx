import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, Phone, Calendar, Heart, MapPin, Award, 
  CheckCircle, Sparkles, Coffee, Gift, Trash2, Edit2 
} from 'lucide-react';
import { UserProfile, CategoryId } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  onDeleteProfile: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onDeleteProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [preferredMilk, setPreferredMilk] = useState<UserProfile['preferredMilk']>('integral');
  const [favoriteCategory, setFavoriteCategory] = useState<CategoryId>('cafes');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [deliveryStreet, setDeliveryStreet] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [deliveryComplement, setDeliveryComplement] = useState('');
  const [deliveryNeighborhood, setDeliveryNeighborhood] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Brasília - DF');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load existing profile when modal opens or profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setBirthdate(profile.birthdate || '');
      setPreferredMilk(profile.preferredMilk || 'integral');
      setFavoriteCategory(profile.favoriteCategory || 'cafes');
      setDietaryRestrictions(profile.dietaryRestrictions || []);
      setDeliveryStreet(profile.deliveryStreet || '');
      setDeliveryNumber(profile.deliveryNumber || '');
      setDeliveryComplement(profile.deliveryComplement || '');
      setDeliveryNeighborhood(profile.deliveryNeighborhood || '');
      setDeliveryCity(profile.deliveryCity || 'Brasília - DF');
      setIsEditing(false);
    } else {
      // Creation mode
      setName('');
      setEmail('');
      setPhone('');
      setBirthdate('');
      setPreferredMilk('integral');
      setFavoriteCategory('cafes');
      setDietaryRestrictions([]);
      setDeliveryStreet('');
      setDeliveryNumber('');
      setDeliveryComplement('');
      setDeliveryNeighborhood('');
      setDeliveryCity('Brasília - DF');
      setIsEditing(true);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const toggleDietaryRestriction = (item: string) => {
    if (dietaryRestrictions.includes(item)) {
      setDietaryRestrictions(dietaryRestrictions.filter((i) => i !== item));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    const updatedProfile: UserProfile = {
      id: profile ? profile.id : `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      birthdate: birthdate.trim(),
      preferredMilk,
      favoriteCategory,
      dietaryRestrictions,
      deliveryStreet: deliveryStreet.trim(),
      deliveryNumber: deliveryNumber.trim(),
      deliveryComplement: deliveryComplement.trim(),
      deliveryNeighborhood: deliveryNeighborhood.trim(),
      deliveryCity: deliveryCity.trim() || 'Brasília - DF',
      loyaltyPoints: profile ? profile.loyaltyPoints : 150, // Welcome bonus points!
      loyaltyTier: profile ? profile.loyaltyTier : 'Bronze',
      createdAt: profile ? profile.createdAt : new Date().toLocaleDateString('pt-BR'),
    };

    onSaveProfile(updatedProfile);
    setSavedSuccess(true);
    setIsEditing(false);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const getMilkLabel = (m?: string) => {
    switch (m) {
      case 'aveia': return 'Leite de Aveia';
      case 'amendoas': return 'Leite de Amêndoas';
      case 'zero-lactose': return 'Leite Zero Lactose';
      case 'desnatado': return 'Leite Desnatado';
      default: return 'Leite Integral';
    }
  };

  const getCategoryLabel = (cat?: CategoryId) => {
    switch (cat) {
      case 'cafes': return 'Cafés Especiais';
      case 'combos': return 'Combos de Trabalho';
      case 'chas': return 'Chás & Infusões';
      case 'salgados': return 'Salgados & Brunch';
      case 'doces': return 'Confeitaria & Doces';
      case 'graos': return 'Grãos Especiais em Pó';
      default: return 'Cafés Especiais';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl w-full max-w-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-950 dark:bg-stone-950 text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xl shadow-md font-display">
              {profile && profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display tracking-tight flex items-center gap-2">
                <span>{profile ? profile.name : 'Criar Perfil de Cliente'}</span>
                {profile && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {profile.loyaltyTier}
                  </span>
                )}
              </h3>
              <p className="text-xs text-stone-400">
                {profile ? 'Sua conta personalizada no El Grano Coffee' : 'Cadastre-se para pedidos mais rápidos e vantagens'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 px-6 py-2.5 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Perfil salvo com sucesso! Seus dados já estão atualizados.</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* VIEW MODE (When profile exists and not editing) */}
          {profile && !isEditing ? (
            <div className="space-y-6">
              {/* Loyalty Card Badge */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white p-5 rounded-2xl shadow-md border border-stone-800 relative overflow-hidden">
                <div className="absolute right-3 top-3 text-stone-800 opacity-20 pointer-events-none">
                  <Award className="w-32 h-32" />
                </div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-0.5">
                      Clube El Grano Fidelidade
                    </span>
                    <h4 className="text-sm font-bold font-display">{profile.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Pontos</span>
                    <span className="text-xl font-bold font-display text-amber-400">{profile.loyaltyPoints} pts</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-300 relative z-10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Cupom Boas-Vindas (15% OFF): <strong className="text-white font-mono bg-stone-800 px-1.5 py-0.5 rounded">BEMVINDO15</strong>
                  </span>
                  <span className="text-[10px] text-stone-400">Desde {profile.createdAt}</span>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-stone-50 dark:bg-stone-800/80 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/80 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                  <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    <span>Dados Pessoais</span>
                  </h4>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 block">E-mail</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">{profile.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 block">Telefone / WhatsApp</span>
                      <span className="font-medium text-stone-900 dark:text-stone-100">{profile.phone}</span>
                    </div>
                  </div>

                  {profile.birthdate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 block">Aniversário</span>
                        <span className="font-medium text-stone-900 dark:text-stone-100">{profile.birthdate}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-stone-50 dark:bg-stone-800/80 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/80 space-y-3 text-xs">
                <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2 border-b border-stone-200 dark:border-stone-700 pb-2">
                  <Heart className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Preferências do Cliente</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700 dark:text-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 block mb-0.5">Leite Preferido</span>
                    <span className="inline-block bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 font-semibold px-2.5 py-1 rounded-lg text-stone-900 dark:text-stone-100">
                      {getMilkLabel(profile.preferredMilk)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 block mb-0.5">Categoria Favorita</span>
                    <span className="inline-block bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 font-semibold px-2.5 py-1 rounded-lg text-stone-900 dark:text-stone-100">
                      {getCategoryLabel(profile.favoriteCategory)}
                    </span>
                  </div>
                </div>

                {profile.dietaryRestrictions && profile.dietaryRestrictions.length > 0 && (
                  <div>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 block mb-1">Dietas / Restrições</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.dietaryRestrictions.map((tag) => (
                        <span key={tag} className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Saved Delivery Address */}
              <div className="bg-stone-50 dark:bg-stone-800/80 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700/80 space-y-2 text-xs">
                <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2 border-b border-stone-200 dark:border-stone-700 pb-2">
                  <MapPin className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span>Endereço de Entrega Padrão</span>
                </h4>

                {profile.deliveryStreet ? (
                  <p className="text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                    {profile.deliveryStreet}, {profile.deliveryNumber}
                    {profile.deliveryComplement ? ` - ${profile.deliveryComplement}` : ''}<br />
                    {profile.deliveryNeighborhood} • {profile.deliveryCity}
                  </p>
                ) : (
                  <p className="text-stone-400 dark:text-stone-500 italic">Nenhum endereço cadastrado ainda.</p>
                )}
              </div>

              {/* Footer Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  onClick={onDeleteProfile}
                  className="text-red-600 hover:text-red-700 dark:text-rose-400 dark:hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir Perfil</span>
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-full bg-stone-950 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 font-bold text-xs cursor-pointer transition-colors"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          ) : (
            /* EDIT / CREATE FORM MODE */
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Step 1: Personal Info */}
              <div className="space-y-3">
                <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2 border-b border-stone-200 dark:border-stone-700 pb-1.5">
                  <User className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                  <span>1. Dados Pessoais</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Ana Clara Souza"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ana@email.com"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(61) 99999-8888"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Data de Nascimento (Aniversário)
                    </label>
                    <input
                      type="text"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      placeholder="DD/MM/AAAA"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Coffee & Food Preferences */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2 border-b border-stone-200 dark:border-stone-700 pb-1.5">
                  <Coffee className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                  <span>2. Suas Preferências no El Grano</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Leite Padrão Favorito
                    </label>
                    <select
                      value={preferredMilk}
                      onChange={(e) => setPreferredMilk(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800"
                    >
                      <option value="integral">Leite Integral (Padrão)</option>
                      <option value="desnatado">Leite Desnatado</option>
                      <option value="aveia">Leite de Aveia (Vegetal)</option>
                      <option value="amendoas">Leite de Amêndoas (Vegetal)</option>
                      <option value="zero-lactose">Leite Zero Lactose</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Categoria Favorita do Cardápio
                    </label>
                    <select
                      value={favoriteCategory}
                      onChange={(e) => setFavoriteCategory(e.target.value as CategoryId)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800"
                    >
                      <option value="cafes">Cafés Especiais</option>
                      <option value="combos">Combos de Trabalho</option>
                      <option value="chas">Chás & Infusões</option>
                      <option value="salgados">Salgados & Brunch</option>
                      <option value="doces">Confeitaria & Doces</option>
                      <option value="graos">Grãos em Pó para Levar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1.5">
                    Restrições Alimentares / Dieta
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'Vegano', label: 'Vegano' },
                      { id: 'Sem Glúten', label: 'Sem Glúten' },
                      { id: 'Sem Lactose', label: 'Sem Lactose' },
                      { id: 'Sem Açúcar', label: 'Sem Açúcar' },
                    ].map((item) => {
                      const isSelected = dietaryRestrictions.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleDietaryRestriction(item.id)}
                          className={`px-3 py-1.5 rounded-full font-semibold text-xs border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 dark:bg-amber-500 text-stone-950 border-amber-500 shadow-2xs font-bold'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-750'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Address (Optional for delivery) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold font-display text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2 border-b border-stone-200 dark:border-stone-700 pb-1.5">
                  <MapPin className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                  <span>3. Endereço Padrão de Entrega (Opcional)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-stone-600 dark:text-stone-400 block mb-0.5">Rua / Logradouro</label>
                    <input
                      type="text"
                      value={deliveryStreet}
                      onChange={(e) => setDeliveryStreet(e.target.value)}
                      placeholder="Ex: SHIS QL 10, Lote 5"
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-600 dark:text-stone-400 block mb-0.5">Número</label>
                    <input
                      type="text"
                      value={deliveryNumber}
                      onChange={(e) => setDeliveryNumber(e.target.value)}
                      placeholder="120"
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-stone-600 dark:text-stone-400 block mb-0.5">Bairro</label>
                    <input
                      type="text"
                      value={deliveryNeighborhood}
                      onChange={(e) => setDeliveryNeighborhood(e.target.value)}
                      placeholder="Lago Sul"
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-600 dark:text-stone-400 block mb-0.5">Cidade / UF</label>
                    <input
                      type="text"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      placeholder="Brasília - DF"
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:border-stone-950 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                {profile && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-stone-950 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 font-bold tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  {profile ? 'Salvar Alterações' : 'Criar Perfil e Ganhar Bônus'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
