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
            var Match = (function (_super) {
                __extends(Match, _super);
                function Match(scope, element, attributes, modelController, formController) {
                    var _this = this;
                    _super.call(this, scope, element, attributes, modelController);
                    this.formController = formController;

                    this.matchingModelController = this.formController[attributes[Match.Name]];
                    if (this.matchingModelController) {
                        this.matchingModelController.$parsers.unshift(function (viewValue) {
                            _this.parse(_this.modelController.$viewValue);
                            return viewValue;
                        });
                    }
                }
                Match.prototype.format = function (modelValue) {
                    return modelValue;
                };

                Match.prototype.parse = function (viewValue) {
                    var valid = true;
                    if (viewValue !== this.matchingModelController.$viewValue)
                        valid = false;

                    this.modelController.$setValidity(Match.Name, valid);
                    return viewValue;
                };
                Match.Name = 'match';
                Match.ErrorMessage = 'Passwords do not match';
                return Match;
            })(Validations.ValidationBase);
            Validations.Match = Match;

            angular.module('ExpenseTracker.Directives').directive(Match.Name, function () {
                return {
                    restrict: 'A',
                    require: ['ngModel', '^form'],
                    scope: true,
                    link: function (scope, element, attributes, controllers) {
                        return new Match(scope.$new(), element, attributes, controllers[0], controllers[1]);
                    }
                };
            });
            Directives.Validate.ErrorMessages[Match.Name] = Match.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Match.js.map
