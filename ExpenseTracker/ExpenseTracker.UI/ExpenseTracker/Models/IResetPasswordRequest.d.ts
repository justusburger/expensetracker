declare module ExpenseTracker.Models {
    
    export interface IResetPasswordRequest {
        email?: string;
        challange?: string;
        response?: string;
    }

}