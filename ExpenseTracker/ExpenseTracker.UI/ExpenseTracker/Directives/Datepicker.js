var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Datepicker = (function (_super) {
            __extends(Datepicker, _super);
            function Datepicker(scope, element, attributes, modelController) {
                var _this = this;
                _super.call(this, scope, element, attributes);
                this.modelController = modelController;
                this.modelController.$render = function () {
                    _this.value = _this.modelController.$viewValue;
                    if (!_this.value)
                        _this.value = new Date();
                };
                this.scope.$watch(function () {
                    return _this.value;
                }, function () {
                    _this.open = false;
                    _this.modelController.$setViewValue(_this.value);
                });
                this.open = false;
                var onBodyClickHandler = function (e) {
                    return _this.onBodyClick(e);
                };
                this.element.closest('html').on('click', onBodyClickHandler);
                this.scope.$on('$destroy', function () {
                    return _this.element.closest('body').off('click', onBodyClickHandler);
                });
            }
            Datepicker.prototype.onBodyClick = function (e) {
                var _this = this;
                if ($(e.target).parents('.custom-datepicker').length > 0)
                    return;
                this.scope.$apply(function () {
                    return _this.open = false;
                });
            };

            Datepicker.prototype.toggle = function () {
                this.open = !this.open;
            };
            Datepicker.Name = 'customDatepicker';
            Datepicker.TemplateUrl = 'ExpenseTracker/Views/Datepicker.html';
            return Datepicker;
        })(ExpenseTracker.DirectiveBase);
        Directives.Datepicker = Datepicker;

        angular.module('ExpenseTracker.Directives').directive(Datepicker.Name, function () {
            return {
                replace: true,
                require: 'ngModel',
                restrict: 'E',
                scope: true,
                templateUrl: Datepicker.TemplateUrl,
                link: function (scope, element, attributes, modelController) {
                    return new Datepicker(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Datepicker.js.map
