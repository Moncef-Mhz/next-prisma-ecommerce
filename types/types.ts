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
  categoryId?: string | null; // Allow null
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

export type Order = {
  id: string;
  userId: string;
  totalPrice: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  createdAt: Date;
  items: OrderItem[];
  status: OrderStatusEnum;
  user: {
    address: string | null;
    id: string;
    kindeId: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type OrderItem = {
  id: string;
  orderId: string;
  price: number;
  product: Product; // Updated to match the new Product type
  productId: string;
  quantity: number;
};

export enum OrderStatusEnum {
  NOT_CONFIRMED = "not_confirmed",
  IN_PROGRESS = "in_progress",
  SHIPPED = "shipped",
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  kindeId: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null;
};