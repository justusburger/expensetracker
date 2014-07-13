declare module ExpenseTracker.Models {

    export interface IErrorResponse {

        status: number;
        statusText: string;
        data: { errors: string[] };

    }

} 