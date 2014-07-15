var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(scope, element, attributes) {
                _super.call(this, scope, element, attributes);
            }
            Menu.prototype.signOut = function () {
            };
            Menu.Name = 'menu';
            Menu.TemplateUrl = 'ExpenseTracker/Views/Menu.html';
            return Menu;
        })(ExpenseTracker.DirectiveBase);
        Directives.Menu = Menu;

        angular.module('ExpenseTracker.Directives').directive(Menu.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: Menu.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new Menu(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Menu.js.map
