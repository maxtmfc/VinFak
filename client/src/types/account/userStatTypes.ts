export type UserStatType = {
    id: number;
    userId: number;
    wineId: number;
    count: number;
    createdAt: Date;
    Wine: {
        title:string;
    }
  };