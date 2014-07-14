var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var AlertHandler = (function (_super) {
            __extends(AlertHandler, _super);
            function AlertHandler(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                this.scope.$watchCollection(function () {
                    return _this.alertService.queue;
                }, function () {
                    return _this.displayAlert();
                });
            }
            AlertHandler.prototype.displayAlert = function () {
                if (!Enumerable.From(this.alertService.queue).Any())
                    return;
                var alert = this.alertService.queue.shift();
                var alertItem = $('<div class="alert"></div>').html(alert.message).hide();
                if (alert.type === 0 /* Success */)
                    alertItem.addClass('alert-success');
                if (alert.type === 1 /* Warning */)
                    alertItem.addClass('alert-warning');
                if (alert.type === 2 /* Error */)
                    alertItem.addClass('alert-danger');
                this.element.append(alertItem);
                alertItem.css('margin-left', '-' + (alertItem.outerWidth() / 2) + 'px').fadeIn(200);
                this.timeoutService(function () {
                    return alertItem.fadeOut(2000, function () {
                        return alertItem.remove();
                    });
                }, 4000);
            };
            AlertHandler.Name = 'alertHandler';
            AlertHandler.TemplateUrl = 'ExpenseTracker/Views/AlertHandler.html';
            return AlertHandler;
        })(ExpenseTracker.DirectiveBase);
        Directives.AlertHandler = AlertHandler;

        angular.module('ExpenseTracker.Directives').directive(AlertHandler.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: AlertHandler.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new AlertHandler(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=AlertHandler.js.map
