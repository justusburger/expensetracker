var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Popup = (function (_super) {
            __extends(Popup, _super);
            function Popup() {
                _super.call(this);
                this.queue = [];
            }
            Popup.prototype.show = function (popup, model) {
                popup.model = model;
                this.queue.push(angular.copy(popup));
            };
            Popup.Name = 'Popup';
            return Popup;
        })(ExpenseTracker.Component);
        Services.Popup = Popup;

        angular.module('ExpenseTracker.Services').factory(Popup.Name, function () {
            return new Popup();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Popup.js.map
