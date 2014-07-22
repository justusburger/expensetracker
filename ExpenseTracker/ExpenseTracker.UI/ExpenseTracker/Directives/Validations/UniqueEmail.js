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
            var UniqueEmail = (function (_super) {
                __extends(UniqueEmail, _super);
                function UniqueEmail(scope, element, attributes, modelController) {
                    _super.call(this, scope, element, attributes, modelController);
                }
                UniqueEmail.prototype.format = function (modelValue) {
                    return modelValue;
                };

                UniqueEmail.prototype.parse = function (viewValue) {
                    var _this = this;
                    if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                        return viewValue;

                    this.httpService({ url: this.apiBaseUrl + '/registration/email-unique', method: 'GET', params: { email: viewValue } }).success(function (unique) {
                        _this.modelController.$setValidity(UniqueEmail.Name, unique === 'true');
                    }).error(function (response) {
                        return console.log(response);
                    });

                    return viewValue;
                };
                UniqueEmail.Name = 'uniqueEmail';
                UniqueEmail.ErrorMessage = 'This email account has been registered already.';
                return UniqueEmail;
            })(Validations.ValidationBase);
            Validations.UniqueEmail = UniqueEmail;

            angular.module('ExpenseTracker.Directives').directive(UniqueEmail.Name, function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attributes, modelController) {
                        return new UniqueEmail(scope.$new(), element, attributes, modelController);
                    }
                };
            });
            Directives.Validate.ErrorMessages[UniqueEmail.Name] = UniqueEmail.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=UniqueEmail.js.map
