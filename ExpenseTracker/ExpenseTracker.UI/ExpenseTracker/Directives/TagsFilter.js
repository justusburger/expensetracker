var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var TagsFilter = (function (_super) {
            __extends(TagsFilter, _super);
            function TagsFilter(scope, element, attributes) {
                _super.call(this, scope, element, attributes);
                this.selectedTags = [];

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid text filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            Object.defineProperty(TagsFilter.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            TagsFilter.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    _this.beginUpdate();
                    return _this.expenseService.getAllTags().then(function (tags) {
                        _this.tags = tags;
                        _this.endUpdate();
                    }, function () {
                        return _this.endUpdate();
                    });
                });
            };

            TagsFilter.prototype.toggleFilterType = function () {
                this.isAndFilter = !this.isAndFilter;
                if (this.selectedTags.any())
                    this.filter();
            };

            Object.defineProperty(TagsFilter.prototype, "filterTypeTooltip", {
                get: function () {
                    if (this.isAndFilter)
                        return 'Show expenses that contains ALL selected tags';
                    return 'Show expenses that contain ANY of the selected tags';
                },
                enumerable: true,
                configurable: true
            });

            TagsFilter.prototype.toggle = function (tag) {
                if (this.isSelected(tag))
                    this.selectedTags.remove(tag);
                else
                    this.selectedTags.push(tag);
                this.filter();
            };

            TagsFilter.prototype.filter = function () {
                var query = this.selectedTags.select(function (a) {
                    return a.text;
                }).join(this.isAndFilter ? '&' : '|');
                this.dataProvider.filter('tags', [{ field: 'tags', query: query }]);
            };

            TagsFilter.prototype.isSelected = function (tag) {
                return this.selectedTags.contains(tag);
            };

            TagsFilter.prototype.clear = function () {
                var hadSelectedTags = this.selectedTags.any();
                this.selectedTags = [];
                if (hadSelectedTags)
                    this.filter();
            };
            TagsFilter.Name = 'tagsFilter';

            TagsFilter.TemplateUrl = 'ExpenseTracker/Views/TagsFilter.html';
            return TagsFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.TagsFilter = TagsFilter;

        angular.module('ExpenseTracker.Directives').directive(TagsFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: TagsFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new TagsFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
//# sourceMappingURL=TagsFilter.js.map
