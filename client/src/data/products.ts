export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  impact: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Recycled Ocean Bottle',
    category: 'Kitchen',
    price: 24.95,
    rating: 4.9,
    impact: 'Made from rescued ocean plastic',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 2,
    name: 'Organic Cotton Tee',
    category: 'Apparel',
    price: 32.50,
    rating: 4.8,
    impact: 'Uses 91% less water than conventional cotton',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 3,
    name: 'Bamboo Kitchen Set',
    category: 'Kitchen',
    price: 38.75,
    rating: 4.7,
    impact: 'Fast-growing bamboo, plastic-free finish',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 4,
    name: 'Linen Market Tote',
    category: 'Everyday',
    price: 18.25,
    rating: 4.9,
    impact: 'Replaces 500+ single-use bags',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 5,
    name: 'Plant-Based Candle',
    category: 'Home',
    price: 21.50,
    rating: 4.6,
    impact: 'Coconut wax with a compostable vessel',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 6,
    name: 'Solar Reading Lamp',
    category: 'Home',
    price: 46.80,
    rating: 4.8,
    impact: 'Clean energy for 10 hours per charge',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85'
  }
];

export const categories = ['All', ...new Set(products.map((product) => product.category))];
