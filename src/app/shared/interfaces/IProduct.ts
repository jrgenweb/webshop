export interface ICart {
  productId: number;
  productName: string;
  productImg: string;
  slug: string;
  amount: number;
  price: number;
  priceWithTax: number;
  sum: number;
}

export interface IOrderProducts {
  productId: number;
  productName: string;
  productImg: string;
  slug: string;
  amount: number;
  price: number;
  priceWithTax: number;
  categoryId: number;
}
export enum EOrderStatus {
  '',
  'pendding',
  'delivered',
  'shipped',
}

export type TOrderStatus = '' | 'pending' | 'delivered' | 'shipped';
export interface IOrder {
  id: number;
  user: IUser;
  products: IOrderProducts[];
  total: number;
  status: TOrderStatus;
  createdAt: string;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: number;
  category: ICategory;
  description: string;
  images: string[];
  price: number;
  slug: string;
  title: string;
  creationAt: string;
  updatedAt: string;
}
