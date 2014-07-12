var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var DirectiveBase = (function (_super) {
        __extends(DirectiveBase, _super);
        function DirectiveBase(scope, element, attributes) {
            _super.call(this);
            this.scope = scope;
            this.element = element;
            this.attributes = attributes;

            this.scope.$directive = this;
        }
        Object.defineProperty(DirectiveBase.prototype, "templateCacheService", {
            get: function () {
                return this._templateCacheService || (this._templateCacheService = this.injectorService.get('$templateCache'));
            },
            set: function (value) {
                this._templateCacheService = value;
            },
            enumerable: true,
            configurable: true
        });
        return DirectiveBase;
    })(ExpenseTracker.Component);
    ExpenseTracker.DirectiveBase = DirectiveBase;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=DirectiveBase.js.map
