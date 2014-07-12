var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Home = (function (_super) {
            __extends(Home, _super);
            function Home() {
                _super.call(this);
            }
            Home.Name = 'Home';
            return Home;
        })(ExpenseTracker.ControllerBase);
        Controllers.Home = Home;

        angular.module('ExpenseTracker.Controllers').controller(Home.Name, function () {
            return new Home();
        });
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=Home.js.map
