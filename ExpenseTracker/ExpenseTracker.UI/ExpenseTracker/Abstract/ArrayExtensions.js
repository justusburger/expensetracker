﻿var ExpenseTracker;
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
            return ArrayExtensions;
        })();
        Extensions.ArrayExtensions = ArrayExtensions;

        Array.prototype.remove = ArrayExtensions.remove;
        Array.prototype.any = ArrayExtensions.any;
    })(ExpenseTracker.Extensions || (ExpenseTracker.Extensions = {}));
    var Extensions = ExpenseTracker.Extensions;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ArrayExtensions.js.map
