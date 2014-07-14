var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Models) {
        (function (AlertType) {
            AlertType[AlertType["Success"] = 0] = "Success";
            AlertType[AlertType["Warning"] = 1] = "Warning";
            AlertType[AlertType["Error"] = 2] = "Error";
        })(Models.AlertType || (Models.AlertType = {}));
        var AlertType = Models.AlertType;
    })(ExpenseTracker.Models || (ExpenseTracker.Models = {}));
    var Models = ExpenseTracker.Models;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=AlertTypeEnum.js.map
