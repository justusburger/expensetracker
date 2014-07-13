declare module ExpenseTracker.Model {

    export interface IRegistrationForm {

        name: string;
        email: string;
        password: string;
        acceptTermsAndConditions: boolean;
        newsletterSignup: boolean;

    }

}