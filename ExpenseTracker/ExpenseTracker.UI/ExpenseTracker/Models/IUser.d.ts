declare module ExpenseTracker.Models {

    export interface IUser {

        id?: number;
        name?: string;
        email?: string;
        password?: string;
        currency?: string;
        country?: string;
        acceptsTermsAndConditions?: boolean;
        newsletterSignup?: boolean;

    }

}  