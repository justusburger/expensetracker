 declare module ExpenseTracker.Models {
     
     export interface IDataProviderParams {
         page: number;
         pageSize: number;
         pageCount?: number;
         itemCount?: number
     }

     export interface IDataProviderResults<T> {
         items: T[];
         query: IDataProviderParams;
     }

 }