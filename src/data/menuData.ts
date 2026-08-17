import { MenuItem, CoffeeMethod } from '../types';

import latteImage from '../assets/images/specialty_latte_art_1786641341792.jpg';
import croissantImage from '../assets/images/artisanal_croissant_1786641350888.jpg';

export const MENU_ITEMS: MenuItem[] = [
  // ASSINATURAS WE & COMBOS
  {
    id: 'choux-pistache',
    name: 'Choux Cream de Pistache',
    category: 'doces',
    price: 24.00,
    description: 'Massa choux crocante recheada com diplomata de pistache e chantilly cremoso de pistache de Bronte.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false,
    calories: 290,
    prepTime: '2 min'
  },
  {
    id: 'salted-cream-latte',
    name: 'Salted Cream Cold Brew Latte',
    category: 'cafes',
    price: 22.00,
    description: 'Cold brew especial coberto por camada densa e aveludada de creme salgado artesanal e toque de cacau.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque', 'gelado'],
    customizable: true,
    calories: 180,
    prepTime: '4 min',
    intensity: 4
  },
  {
    id: 'soft-bun-alho',
    name: 'Soft Garlic Bun (Pão de Alho Cremoso)',
    category: 'salgados',
    price: 19.50,
    description: 'Pão macio recheado com cream cheese temperado, banhado em manteiga de alho e ervas e assado na hora.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false,
    calories: 340,
    prepTime: '5 min'
  },
  {
    id: 'magic-stick-morango',
    name: 'Magic Stick de Morango & Cream Cheese',
    category: 'doces',
    price: 23.00,
    description: 'Brioche especial em formato alongado com creme amanteigado, geleia caseira e morangos frescos fatiados.',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false,
    calories: 310,
    prepTime: '2 min'
  },

  // COMBOS FOCO & ESTUDO
  {
    id: 'combo-estudo',
    name: 'Combo Estudo & Foco (Refil de Café Incluso)',
    category: 'combos',
    price: 29.90,
    description: 'Um Cappuccino ou Salted Latte + Toast Avocado em Pão de Fermentação Natural + 1 Refil de Café Coado para render nas horas de estudo.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: true,
    calories: 380,
    prepTime: '6 min',
    intensity: 4
  },
  {
    id: 'combo-reuniao',
    name: 'Combo Worker (Latte Avelã + Croissant)',
    category: 'combos',
    price: 28.50,
    description: 'Nosso famoso Velvet Latte de Avelã acompanhado de Croissant artesanal folhado de manteiga francesa.',
    image: croissantImage,
    tags: ['destaque'],
    customizable: true,
    calories: 420,
    prepTime: '5 min',
    intensity: 3
  },

  // CAFÉS
  {
    id: 'exp-duplo',
    name: 'Espresso Duplo Especial',
    category: 'cafes',
    price: 9.50,
    description: 'Extração perfeita com grãos 100% Arábica de alta pontuação SCAA. Notas de chocolate e caramelo.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: true,
    calories: 10,
    prepTime: '3 min',
    intensity: 5
  },
  {
    id: 'latte-avelan',
    name: 'Velvet Latte de Avelã',
    category: 'cafes',
    price: 18.90,
    description: 'Espresso duplo com leite vaporizado sedoso e xarope de avelã tostada artesanal feito na casa.',
    image: latteImage,
    tags: ['destaque'],
    customizable: true,
    calories: 190,
    prepTime: '5 min',
    intensity: 3
  },
  {
    id: 'cappuccino-italiano',
    name: 'Cappuccino Clássico Italiano',
    category: 'cafes',
    price: 16.50,
    description: 'Proporção perfeita de 1/3 espresso, 1/3 leite cremoso e 1/3 espuma densa, polvilhado com cacau 70%.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: true,
    calories: 150,
    prepTime: '4 min',
    intensity: 4
  },
  {
    id: 'cold-brew-laranja',
    name: 'Cold Brew Laranja & Tônica',
    category: 'cafes',
    price: 19.00,
    description: 'Café infusionado a frio por 18 horas, servido com suco natural de laranja Bahia fresca, água tônica e gelo.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    tags: ['gelado', 'vegano'],
    customizable: true,
    calories: 95,
    prepTime: '3 min',
    intensity: 3
  },

  // CHÁS & INFUSÕES WE
  {
    id: 'matcha-latte',
    name: 'Matcha Latte Cerimonial',
    category: 'chas',
    price: 20.00,
    description: 'Matcha de grau cerimonial importado do Japão com leite de aveia vaporizado e um toque sutil de baunilha.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    tags: ['vegano', 'sem-lactose', 'destaque'],
    customizable: true,
    calories: 110,
    prepTime: '4 min'
  },
  {
    id: 'tea-jasmim-maracuja',
    name: 'Iced Jasmine Tea com Maracujá & Limão',
    category: 'chas',
    price: 18.50,
    description: 'Chá verde de jasmim artesanal gelado misturado com polpa de maracujá doce e suco de limão siciliano.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    tags: ['gelado', 'vegano', 'destaque'],
    customizable: true,
    calories: 80,
    prepTime: '3 min'
  },

  // SALGADOS
  {
    id: 'croissant-manteiga',
    name: 'Croissant Francês Folhado',
    category: 'salgados',
    price: 14.50,
    description: 'Receita tradicional francesa com manteiga de lavoura, casca crocante e miolo leve e aerado.',
    image: croissantImage,
    tags: [],
    customizable: false,
    calories: 280,
    prepTime: '4 min'
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast & Ovo Poché',
    category: 'salgados',
    price: 26.00,
    description: 'Pão de fermentação natural tostado, pasta cremosa de abacate temperada, ovo caipira poché e sementes de gergelim.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false,
    calories: 320,
    prepTime: '10 min'
  },

  // DOCES & ENTREMETS
  {
    id: 'entremet-vitrola',
    name: 'Entremet Vitrola (Cream Cheese & Framboesa)',
    category: 'doces',
    price: 26.00,
    description: 'Mousse aveludada de cream cheese com coração cremoso de framboesa em base crocante de biscoito.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false,
    calories: 320,
    prepTime: '2 min'
  },
  {
    id: 'cheesecake-frutas-vermelhas',
    name: 'Cheesecake com Calda de Frutas Vermelhas',
    category: 'doces',
    price: 21.00,
    description: 'Massa crocante de biscoito, creme ultra aveludado de cream cheese e geleia caseira de amora, framboesa e morango.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    tags: [],
    customizable: false,
    calories: 380,
    prepTime: '2 min'
  },

  // GRÃOS & PACOTES
  {
    id: 'grao-sul-minas-250g',
    name: 'Pacote de Grão Especial El Grano (250g)',
    category: 'graos',
    price: 39.90,
    description: 'Variedade Catuaí Amarelo, pontuação 86 SCAA. Torra média com notas cítricas de laranja e melado de cana.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    tags: ['destaque'],
    customizable: false
  }
];

export const BREWING_METHODS: CoffeeMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60',
    iconName: 'Droplet',
    description: 'Filtro cônico de papel que destaca a acidez brilhante e as notas florais e frutadas do café.',
    grind: 'Média-Fina (como sal grosso)',
    ratio: '1:15 (15g de café para 225ml de água)',
    time: '2:30 a 3:00 min',
    flavorProfile: 'Bebida límpida, corpo leve, aroma destacado e acidez acentuada.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    iconName: 'Flame',
    description: 'Extração por pressão manual rápida que extrai máxima doçura sem amargor elevado.',
    grind: 'Fina-Média',
    ratio: '1:14 (18g de café para 250ml de água)',
    time: '1:45 min',
    flavorProfile: 'Corpo aveludado, doçura elevada e acidez equilibrada.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prensa-francesa',
    name: 'Prensa Francesa (French Press)',
    iconName: 'Coffee',
    description: 'Método de infusão total com embolo de malha metálica que retém óleos essenciais do grão.',
    grind: 'Grossa (como sal marinho)',
    ratio: '1:12 (20g de café para 240ml de água)',
    time: '4:00 min de infusão',
    flavorProfile: 'Bebida muito encorpada, textura densa e sabor prolongado na boca.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chemex',
    name: 'Chemex',
    iconName: 'Wine',
    description: 'Jarra de vidro elegante com filtro de papel especial mais denso que remove todos os óleos e sedimentos.',
    grind: 'Média-Grossa',
    ratio: '1:16 (30g de café para 480ml de água)',
    time: '4:00 a 4:30 min',
    flavorProfile: 'Extremamente cristalino, doçura limpa, ausência total de amargor.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  }
];
