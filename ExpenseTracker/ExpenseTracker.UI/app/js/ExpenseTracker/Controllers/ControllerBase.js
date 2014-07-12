var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ControllerBase = (function (_super) {
            __extends(ControllerBase, _super);
            function ControllerBase() {
                _super.call(this);
            }
            return ControllerBase;
        })(ExpenseTracker.Component);
        Controllers.ControllerBase = ControllerBase;
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ControllerBase.js.map
