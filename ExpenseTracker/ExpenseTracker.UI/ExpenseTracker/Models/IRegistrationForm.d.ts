declare module ExpenseTracker.Models {

    export interface IRegistrationForm {

        name: string;
        email: string;
        password: string;
        acceptTermsAndConditions: boolean;
        newsletterSignup: boolean;

    }

}