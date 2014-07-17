var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Models) {
        (function (PopupStyleEnum) {
            PopupStyleEnum[PopupStyleEnum["Default"] = 0] = "Default";
            PopupStyleEnum[PopupStyleEnum["Danger"] = 1] = "Danger";
        })(Models.PopupStyleEnum || (Models.PopupStyleEnum = {}));
        var PopupStyleEnum = Models.PopupStyleEnum;

        (function (PopupSizeEnum) {
            PopupSizeEnum[PopupSizeEnum["Default"] = 0] = "Default";
            PopupSizeEnum[PopupSizeEnum["Small"] = 1] = "Small";
            PopupSizeEnum[PopupSizeEnum["Large"] = 2] = "Large";
        })(Models.PopupSizeEnum || (Models.PopupSizeEnum = {}));
        var PopupSizeEnum = Models.PopupSizeEnum;

        (function (PopupButtonStyleEnum) {
            PopupButtonStyleEnum[PopupButtonStyleEnum["Default"] = 0] = "Default";
            PopupButtonStyleEnum[PopupButtonStyleEnum["Danger"] = 1] = "Danger";
            PopupButtonStyleEnum[PopupButtonStyleEnum["Success"] = 2] = "Success";
        })(Models.PopupButtonStyleEnum || (Models.PopupButtonStyleEnum = {}));
        var PopupButtonStyleEnum = Models.PopupButtonStyleEnum;
    })(ExpenseTracker.Models || (ExpenseTracker.Models = {}));
    var Models = ExpenseTracker.Models;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=IPopup.js.map
