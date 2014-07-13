var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Validate = (function (_super) {
            __extends(Validate, _super);
            function Validate(scope, element, attributes, modelController, container) {
                var _this = this;
                _super.call(this, scope, element, attributes);
                this.hadFocus = false;
                if (!attributes['name'])
                    throw new ExpenseTracker.ArgumentException('name', 'Input does not have a name attribute.');

                this.modelController = modelController;
                this.container = container;
                this.validIndicator = this.container.find('.valid');
                this.invalidIndicator = this.container.find('.invalid');
                this.spacer = this.container.find('.spacer');

                scope.$watch(function () {
                    return _this.modelController.$viewValue;
                }, function () {
                    return _this.showValidity();
                });
                element.on('blur', function () {
                    _this.scope.$apply(function () {
                        _this.hadFocus = true;
                        _this.showValidity();
                    });
                });
            }
            Validate.prototype.showValidity = function () {
                this.spacer.hide();
                this.validIndicator.hide();
                this.invalidIndicator.hide();

                if (!this.hadFocus)
                    this.spacer.show();
                else {
                    if (this.modelController.$valid)
                        this.validIndicator.show();
                    if (this.modelController.$invalid) {
                        this.invalidIndicator.show();
                        var failedValidation;
                        for (var key in this.modelController.$error) {
                            if (this.modelController.$error[key]) {
                                failedValidation = key;
                                break;
                            }
                        }
                        this.failedValidationMessage = Validate.ErrorMessages[failedValidation];
                    }
                }
            };
            Validate.Name = 'validate';
            Validate.TemplateUrl = 'ExpenseTracker/Views/Validate.html';
            Validate.ErrorMessages = {
                'email': 'Invalid email address. Example: john.smith@email.com',
                'required': 'This field is required'
            };
            return Validate;
        })(ExpenseTracker.DirectiveBase);
        Directives.Validate = Validate;

        angular.module('ExpenseTracker.Directives').directive(Validate.Name, [
            '$compile', function (compileService) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    templateUrl: Validate.TemplateUrl,
                    compile: function (element, attributes) {
                        var container = element.find('.form-validity');
                        container.insertAfter(element);
                        return function (scope, element, attributes, modelController) {
                            var validateScope = scope.$new();
                            new Validate(validateScope, element, attributes, modelController, container);
                            compileService(container)(validateScope);
                        };
                    }
                };
            }]);
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Validate.js.map
