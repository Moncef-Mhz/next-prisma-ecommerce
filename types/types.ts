export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  categoryId?: string; // Optional
  description: string;
  quantity?: number; // Optional
}

export type OrderType = {
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
