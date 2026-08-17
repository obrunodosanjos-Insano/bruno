export type CategoryId = 'combos' | 'cafes' | 'chas' | 'salgados' | 'doces' | 'graos';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  tags?: ('vegano' | 'sem-gluten' | 'sem-lactose' | 'destaque' | 'gelado')[];
  customizable?: boolean;
  calories?: number;
  prepTime?: string;
  intensity?: number; // 1-5 for coffees
}

export interface CustomizationOption {
  milk?: 'integral' | 'desnatado' | 'aveia' | 'amendoas' | 'zero-lactose';
  sweetness?: 'normal' | 'pouco' | 'sem-acucar' | 'adocante';
  extraShot?: boolean;
  temperature?: 'quente' | 'gelado' | 'com-gelo-extra';
  whippedCream?: boolean;
  notes?: string;
}

export interface CartItem {
  cartId: string; // unique ID including customization
  item: MenuItem;
  quantity: number;
  customization?: CustomizationOption;
  totalPrice: number;
}

export interface ReservationDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area: 'salao' | 'varanda' | 'silencioso' | 'eventos';
  specialRequests?: string;
}

export interface CoffeeMethod {
  id: string;
  name: string;
  iconName: string;
  description: string;
  grind: string;
  ratio: string;
  time: string;
  flavorProfile: string;
  image: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate?: string;
  preferredMilk?: 'integral' | 'desnatado' | 'aveia' | 'amendoas' | 'zero-lactose';
  favoriteCategory?: CategoryId;
  dietaryRestrictions?: string[];
  deliveryStreet?: string;
  deliveryNumber?: string;
  deliveryComplement?: string;
  deliveryNeighborhood?: string;
  deliveryCity?: string;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Prata' | 'Ouro' | 'VIP';
  createdAt: string;
}

