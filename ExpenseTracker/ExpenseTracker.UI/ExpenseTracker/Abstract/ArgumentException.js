var ExpenseTracker;
(function (ExpenseTracker) {
    var ArgumentException = (function () {
        function ArgumentException(argument, message) {
            this.argument = argument;
            this.message = message;
        }
        ArgumentException.prototype.toString = function () {
            return 'Argument exception: ' + this.argument + '. ' + this.message;
        };
        return ArgumentException;
    })();
    ExpenseTracker.ArgumentException = ArgumentException;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ArgumentException.js.map
