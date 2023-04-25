export type UserForAccount = {
    id: number;
    nickName:string;
    firstName:string;
    lastName:string;
    email: string;
    statusId: number;
    admin: boolean;
    Status: {
        title:string;
    }
    Stats: [{
        userId: number;
        wineId: number;
        count: number;
        createdAt: string;
        updatedAt: string;
    }]
  };

  export type AccountFormType = {
    nickName:string;
    firstName:string;
    lastName:string;
    email: string;
  };

  export type ChangeStatusFormType = {
    statusId: number;
  }