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
                if (!attributes['name'])
                    throw new ExpenseTracker.ArgumentException('name', 'Input does not have a name attribute.');

                _super.call(this, scope, element, attributes);
                this.modelController = modelController;

                this.templateHtml.then(function (content) {
                    $(content).insertAfter(element);
                    var container = element.next();
                    _this.validIndicator = container.find('.valid');
                    _this.invalidIndicator = container.find('.invalid');
                    _this.spacer = container.find('.spacer');

                    scope.$watch(function () {
                        return _this.modelController.$viewValue;
                    }, function () {
                        return _this.showValidity();
                    });
                });
            }
            Validate.prototype.showValidity = function () {
                this.spacer.hide();
                this.validIndicator.hide();
                this.invalidIndicator.hide();

                if (this.modelController.$pristine)
                    this.spacer.show();
                else {
                    if (this.modelController.$valid)
                        this.validIndicator.show();
                    if (this.modelController.$invalid)
                        this.invalidIndicator.show();
                }
            };

            Object.defineProperty(Validate.prototype, "templateHtml", {
                get: function () {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    var template = this.templateCacheService.get(Validate.TemplateUrl);
                    if (template)
                        defer.resolve(template);
                    else {
                        this.httpService.get(Validate.TemplateUrl).then(function (response) {
                            _this.templateCacheService.put(Validate.TemplateUrl, response.data);
                            defer.resolve(response.data);
                        });
                    }
                    return defer.promise;
                },
                enumerable: true,
                configurable: true
            });
            Validate.Name = 'validate';
            Validate.TemplateUrl = 'ExpenseTracker/Views/Validate.html';
            return Validate;
        })(ExpenseTracker.DirectiveBase);
        Directives.Validate = Validate;

        angular.module('ExpenseTracker.Directives').directive(Validate.Name, function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attributes, modelController) {
                    return new Validate(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Validate.js.map
