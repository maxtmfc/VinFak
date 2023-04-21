export type WineType = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type WineWithCategory = WineType & {
    category: Category;
  };
