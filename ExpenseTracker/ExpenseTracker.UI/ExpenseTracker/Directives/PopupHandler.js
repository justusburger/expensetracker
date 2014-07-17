var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var PopupHandler = (function (_super) {
            __extends(PopupHandler, _super);
            function PopupHandler(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                this.scope.$watchCollection(function () {
                    return _this.popupService.queue;
                }, function () {
                    return _this.displayPopup();
                });
            }
            PopupHandler.prototype.displayPopup = function () {
                if (!this.popupService.queue.any())
                    return;
                this.currentPopup = this.popupService.queue.shift();
                this.currentPopup.title = this.interpolateAndMarkAsSafeHtml(this.currentPopup.title, this.currentPopup.model);
                this.currentPopup.text = this.interpolateAndMarkAsSafeHtml(this.currentPopup.text, this.currentPopup.model);
                this.element.modal();
            };

            PopupHandler.prototype.buttonClickFn = function (button) {
                if (angular.isFunction(button.clickFn))
                    button.clickFn(this.currentPopup.model);
                this.element.modal('hide');
            };

            Object.defineProperty(PopupHandler.prototype, "isSmall", {
                get: function () {
                    return this.currentPopup && this.currentPopup.size === 1 /* Small */;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(PopupHandler.prototype, "isLarge", {
                get: function () {
                    return this.currentPopup && this.currentPopup.size === 2 /* Large */;
                },
                enumerable: true,
                configurable: true
            });

            PopupHandler.prototype.interpolateAndMarkAsSafeHtml = function (template, model) {
                var expression = this.interpolateService(template);
                var value = expression(model);
                return this.sceService.trustAsHtml(value);
            };
            PopupHandler.Name = 'popupHandler';
            PopupHandler.TemplateUrl = 'ExpenseTracker/Views/PopupHandler.html';
            return PopupHandler;
        })(ExpenseTracker.DirectiveBase);
        Directives.PopupHandler = PopupHandler;

        angular.module('ExpenseTracker.Directives').directive(PopupHandler.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: PopupHandler.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new PopupHandler(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=PopupHandler.js.map
