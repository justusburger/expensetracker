var ExpenseTracker;
(function (ExpenseTracker) {
    var NotImplementedException = (function () {
        function NotImplementedException(message) {
            this.message = message;
        }
        NotImplementedException.prototype.toString = function () {
            return 'Not implemented exception: ' + this.message;
        };
        return NotImplementedException;
    })();
    ExpenseTracker.NotImplementedException = NotImplementedException;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=NotImplementedException.js.map
