var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var ValidationBase = (function (_super) {
        __extends(ValidationBase, _super);
        function ValidationBase(scope, element, attributes) {
            _super.call(this, scope, element, attributes);
        }
        return ValidationBase;
    })(ExpenseTracker.DirectiveBase);
    ExpenseTracker.ValidationBase = ValidationBase;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ValidationBase.js.map
