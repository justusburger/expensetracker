var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var ControllerBase = (function (_super) {
        __extends(ControllerBase, _super);
        function ControllerBase(scope) {
            _super.call(this);

            this.scope = scope;
            this.scope.$controller = this;
        }
        return ControllerBase;
    })(ExpenseTracker.SecuredComponent);
    ExpenseTracker.ControllerBase = ControllerBase;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ControllerBase.js.map
