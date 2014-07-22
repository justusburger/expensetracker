 declare module ExpenseTracker.Models {
     
     export interface IDataProviderQuery {
         page: number;
         pageSize: number;
         pageCount?: number;
         itemCount?: number;
         filters: string[];
         download?: boolean;
     }

     export interface IDataProviderFilter {
         field: string;
         query: string;
     }

     export interface IDataProviderResults<T> {
         items: T[];
         query: IDataProviderQuery;
     }

 }