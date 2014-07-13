var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        (function (Validations) {
            var ValidationBase = (function (_super) {
                __extends(ValidationBase, _super);
                function ValidationBase(scope, element, attributes, modelController) {
                    var _this = this;
                    _super.call(this, scope, element, attributes);
                    this.modelController = modelController;

                    this.modelController.$parsers.unshift(function (viewValue) {
                        return _this.parse(viewValue);
                    });
                    this.modelController.$formatters.push(function (modelValue) {
                        return _this.format(modelValue);
                    });
                }
                ValidationBase.prototype.format = function (modelValue) {
                    throw new ExpenseTracker.NotImplementedException('Format function not defined');
                };

                ValidationBase.prototype.parse = function (viewValue) {
                    throw new ExpenseTracker.NotImplementedException('Parse function not defined');
                };
                return ValidationBase;
            })(ExpenseTracker.DirectiveBase);
            Validations.ValidationBase = ValidationBase;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ValidationBase.js.map
