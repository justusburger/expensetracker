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
                function Match(scope, element, attributes, modelController) {
                    _super.call(this, scope, element, attributes, modelController);
                }
                Match.prototype.format = function (modelValue) {
                    return modelValue;
                };

                Match.prototype.parse = function (viewValue) {
                    if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                        return viewValue;

                    var valid = true;
                    if (viewValue !== this.valueToMatch)
                        valid = false;

                    this.modelController.$setValidity(Match.Name, valid);
                    return viewValue;
                };

                Object.defineProperty(Match.prototype, "valueToMatch", {
                    get: function () {
                        return this.scope.$eval(this.attributes[Match.Name]);
                    },
                    enumerable: true,
                    configurable: true
                });
                Match.Name = 'match';
                Match.ErrorMessage = 'Passwords do not match';
                return Match;
            })(Validations.ValidationBase);
            Validations.Match = Match;

            angular.module('ExpenseTracker.Directives').directive(Match.Name, function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attributes, modelController) {
                        return new Match(scope.$new(), element, attributes, modelController);
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
