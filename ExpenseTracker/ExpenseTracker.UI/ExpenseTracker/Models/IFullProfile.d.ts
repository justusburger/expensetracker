declare module ExpenseTracker.Models {

    export interface IFullProfile {

        id: number;
        userName: string;
        email: string;
        country: string;
        currency: string;
        availableCountries: any;
        availableCurrencies: any;

    }

}  