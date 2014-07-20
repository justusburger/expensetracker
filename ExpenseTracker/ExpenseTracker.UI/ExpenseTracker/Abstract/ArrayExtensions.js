var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Extensions) {
        var ArrayExtensions = (function () {
            function ArrayExtensions() {
            }
            ArrayExtensions.remove = function (element) {
                var self = this;
                var index = self.indexOf(element);
                self.splice(index, 1);
                return self;
            };

            ArrayExtensions.any = function (selector) {
                var self = this;
                return Enumerable.From(self).Any(selector);
            };

            ArrayExtensions.select = function (selector) {
                var self = this;
                return Enumerable.From(self).Select(selector).ToArray();
            };

            ArrayExtensions.first = function () {
                var self = this;
                return self[0];
            };

            ArrayExtensions.last = function () {
                var self = this;
                return self[self.length - 1];
            };
            return ArrayExtensions;
        })();
        Extensions.ArrayExtensions = ArrayExtensions;

        Array.prototype.remove = ArrayExtensions.remove;
        Array.prototype.any = ArrayExtensions.any;
        Array.prototype.select = ArrayExtensions.select;
        Array.prototype.first = ArrayExtensions.first;
        Array.prototype.last = ArrayExtensions.last;
    })(ExpenseTracker.Extensions || (ExpenseTracker.Extensions = {}));
    var Extensions = ExpenseTracker.Extensions;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ArrayExtensions.js.map
