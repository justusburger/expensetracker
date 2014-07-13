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
            var ComplexPassword = (function (_super) {
                __extends(ComplexPassword, _super);
                function ComplexPassword(scope, element, attributes, modelController) {
                    _super.call(this, scope, element, attributes, modelController);
                }
                ComplexPassword.prototype.format = function (modelValue) {
                    return modelValue;
                };

                ComplexPassword.prototype.parse = function (viewValue) {
                    if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                        return viewValue;

                    var valid = true;

                    //Ensure password length is > 4
                    if (viewValue.length < 4)
                        valid = false;

                    //Ensure password contains atleast 1 number
                    if (!/[\d]+/.test(viewValue))
                        valid = false;

                    this.modelController.$setValidity(ComplexPassword.Name, valid);
                    return viewValue;
                };
                ComplexPassword.Name = 'complexPassword';
                ComplexPassword.ErrorMessage = 'Password must be 4 or more characters and contain atleast 1 number.';
                return ComplexPassword;
            })(Validations.ValidationBase);
            Validations.ComplexPassword = ComplexPassword;

            angular.module('ExpenseTracker.Directives').directive(ComplexPassword.Name, function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attributes, modelController) {
                        return new ComplexPassword(scope.$new(), element, attributes, modelController);
                    }
                };
            });
            Directives.Validate.ErrorMessages[ComplexPassword.Name] = ComplexPassword.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=ComplexPassword.js.map
