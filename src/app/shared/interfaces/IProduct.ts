export interface ICart {
  productId: number;
  productName: string;
  productImg: string;
  amount: number;
  price: number;
  priceWithTax: number;
  sum: number;
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
