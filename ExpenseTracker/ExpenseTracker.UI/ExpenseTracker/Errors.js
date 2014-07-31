var ExpenseTracker;
(function (ExpenseTracker) {
    var Errors = (function () {
        function Errors() {
        }
        Errors.REGISTRATION_EMAIL_ALREADY_REGISTERED = 2;
        Errors.SIGN_IN_ACCOUNT_LOCKED = 3;
        Errors.SIGN_IN_INCORRECT_DETAILS = 4;
        Errors.SIGN_IN_EMAIL_NOT_VERIFIED = 6;
        Errors.UNAUTHENTICATED = 5;
        Errors.EMAIL_VERIFICATION_TOKEN_NOT_FOUND = 7;
        return Errors;
    })();
    ExpenseTracker.Errors = Errors;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Errors.js.map
