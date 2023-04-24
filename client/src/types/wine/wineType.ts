export type WineType = {
  id: number;
  key: number;
  title: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  priceStudent?: number,
  priceBakalavr?: number,
};

export type Category = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type WineWithCategory = WineType & {
  Category: Category;
};

