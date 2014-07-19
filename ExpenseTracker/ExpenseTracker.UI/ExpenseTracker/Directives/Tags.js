var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Tags = (function (_super) {
            __extends(Tags, _super);
            function Tags(scope, element, attributes, modelController) {
                var _this = this;
                _super.call(this, scope, element, attributes);
                this.value = [];
                this.modelController = modelController;
                this.modelController.$render = function () {
                    if (_this.modelController.$viewValue && angular.isArray(_this.modelController.$viewValue))
                        _this.value = _this.modelController.$viewValue.select(function (a) {
                            return { text: a };
                        });
                    else
                        _this.value = [];
                };
                this.scope.$watchCollection(function () {
                    return _this.value;
                }, function () {
                    if (_this.value)
                        _this.modelController.$setViewValue(_this.value.select(function (o) {
                            return o.text;
                        }));
                });
            }
            Tags.Name = 'tags';
            Tags.TemplateUrl = 'ExpenseTracker/Views/Tags.html';
            return Tags;
        })(ExpenseTracker.DirectiveBase);
        Directives.Tags = Tags;

        angular.module('ExpenseTracker.Directives').directive(Tags.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                require: 'ngModel',
                scope: true,
                templateUrl: Tags.TemplateUrl,
                link: function (scope, element, attributes, modelController) {
                    return new Tags(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Tags.js.map
