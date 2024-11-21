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
  categoryId?: string;
  orderId?: string;
  description: string;
  quantity: number;
}
