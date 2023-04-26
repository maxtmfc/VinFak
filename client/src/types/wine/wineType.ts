export type WineType = {
  id: number;
  key: number;
  title: string;
  price: number;
  archived?: boolean;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  priceStudent?: number;
  priceBakalavr?: number;
};

export type Category = {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};

export type WineWithCategory = WineType & {
  Category: Category;
};

export type StatFormType = {
  userId?: number;
  title: string;
  count?: number;
};

export type Wine = {
  title: string;
  Category: {
    title: string;
  };
};
export type Option = {
  label: string;
  value: string;
};
export type WineByCategory = {
  [categoryTitle: string]: Option[];
};

export type ArrCategory = {
  label: string;
  value: string;
};
