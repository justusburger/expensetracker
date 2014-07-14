declare module ExpenseTracker.Models {

    export interface IErrorResponse {

        status: number;
        statusText: string;
        data: {
            errorCode?: number;
            statusCode?: number;
            message?: string;
        };

    }

} 