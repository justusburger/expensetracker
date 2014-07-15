declare module ExpenseTracker.Models {

    export interface IRegistrationRequest {

        name: string;
        email: string;
        password: string;
        acceptTermsAndConditions: boolean;
        newsletterSignup: boolean;

    }

}