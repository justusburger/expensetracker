var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Alert = (function (_super) {
            __extends(Alert, _super);
            function Alert() {
                _super.call(this);
                this.queue = [];
            }
            Alert.prototype.success = function (message) {
                this.queue.push({
                    type: 0 /* Success */,
                    message: message
                });
            };

            Alert.prototype.warning = function (message) {
                this.queue.push({
                    type: 1 /* Warning */,
                    message: message
                });
            };

            Alert.prototype.error = function (message) {
                this.queue.push({
                    type: 2 /* Error */,
                    message: message
                });
            };
            Alert.Name = 'Alert';
            return Alert;
        })(ExpenseTracker.Component);
        Services.Alert = Alert;

        angular.module('ExpenseTracker.Services').factory(Alert.Name, function () {
            return new Alert();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Alert.js.map
