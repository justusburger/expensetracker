declare module ExpenseTracker.Models {

    export interface IErrorResponse {

        status: number;
        statusText: string;
        data: {
            type?: string;
            statusCode?: number;
            message?: string;
        };

    }

} 