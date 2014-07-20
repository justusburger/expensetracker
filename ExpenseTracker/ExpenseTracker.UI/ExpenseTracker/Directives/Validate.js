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
            function Validate(scope, element, attributes, modelController) {
                var _this = this;
                _super.call(this, scope.$new(), element, attributes);
                if (!attributes['name'])
                    throw new ExpenseTracker.ArgumentException('name', 'Input does not have a name attribute.');

                if (!attributes[Validate.Name])
                    throw new ExpenseTracker.ArgumentException('error container', 'Input does not have an error container specified.');

                this.modelController = modelController;

                this.container = angular.element(attributes[Validate.Name]).addClass('form-validity');
                this.container.append('<i class="glyphicon glyphicon-ok valid" ng-show="$directive.valid"></i>');
                this.container.append('<i class="glyphicon glyphicon-exclamation-sign invalid" ng-show="$directive.invalid" popover="{{ $directive.failedValidationMessage }}" popover-trigger="mouseenter" popover-placement="left"></i>');
                this.compileService(this.container)(this.scope);

                if (attributes[Validate.Name + 'Watch'])
                    this.scope.$watch(attributes[Validate.Name + 'Watch'], function () {
                        return _this.modelController.$setViewValue(_this.modelController.$viewValue);
                    });
            }
            Object.defineProperty(Validate.prototype, "valid", {
                get: function () {
                    return this.modelController.$valid;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Validate.prototype, "invalid", {
                get: function () {
                    return this.modelController.$invalid;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Validate.prototype, "failedValidationMessage", {
                get: function () {
                    var failedValidation;
                    for (var key in this.modelController.$error) {
                        if (this.modelController.$error[key]) {
                            failedValidation = key;
                            break;
                        }
                    }
                    return Validate.ErrorMessages[failedValidation];
                },
                enumerable: true,
                configurable: true
            });
            Validate.Name = 'validate';
            Validate.ErrorMessages = {
                'email': 'Invalid email address. Example: john.smith@email.com',
                'required': 'This field is required'
            };
            return Validate;
        })(ExpenseTracker.DirectiveBase);
        Directives.Validate = Validate;

        angular.module('ExpenseTracker.Directives').directive(Validate.Name, function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: true,
                link: function (scope, element, attributes, modelController) {
                    return new Validate(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Validate.js.map
