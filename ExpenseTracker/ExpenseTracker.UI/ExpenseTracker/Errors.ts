module ExpenseTracker {
    
    export class Errors {
        
        public static REGISTRATION_EMAIL_ALREADY_REGISTERED: number = 2;
        public static SIGN_IN_ACCOUNT_LOCKED: number = 3;
        public static SIGN_IN_INCORRECT_DETAILS: number = 4;
        public static SIGN_IN_EMAIL_NOT_VERIFIED: number = 6;
        public static UNAUTHENTICATED: number = 5;
        public static EMAIL_VERIFICATION_TOKEN_NOT_FOUND: number = 7;
        public static RESET_PASSWORD_INVALID_TOKEN: number = 10;

    }

} 