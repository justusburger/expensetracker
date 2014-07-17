module ExpenseTracker.Directives {

    export class PopupHandler extends DirectiveBase {

        public static Name: string = 'popupHandler';
        public static TemplateUrl: string = 'ExpenseTracker/Views/PopupHandler.html';
        private currentPopup: Models.IPopup;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            this.scope.$watchCollection(() => this.popupService.queue, () => this.displayPopup());
        }

        public displayPopup(): void {
            if (!this.popupService.queue.any())
                return;
            this.currentPopup = this.popupService.queue.shift();
            this.currentPopup.title = this.interpolateAndMarkAsSafeHtml(this.currentPopup.title, this.currentPopup.model);
            this.currentPopup.text = this.interpolateAndMarkAsSafeHtml(this.currentPopup.text, this.currentPopup.model);
            (<any>this.element).modal();
        }

        public buttonClickFn(button: Models.IPopupButton): void {
            if (angular.isFunction(button.clickFn))
                button.clickFn(this.currentPopup.model);
            (<any>this.element).modal('hide');
        }

        public get isSmall(): boolean {
            return this.currentPopup && this.currentPopup.size === Models.PopupSizeEnum.Small;
        }

        public get isLarge(): boolean {
            return this.currentPopup && this.currentPopup.size === Models.PopupSizeEnum.Large;
        }

        private interpolateAndMarkAsSafeHtml(template: string, model: any): string {
            var expression = this.interpolateService(template);
            var value = expression(model);
            return this.sceService.trustAsHtml(value);
        }

    }

    angular.module('ExpenseTracker.Directives').directive(PopupHandler.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: PopupHandler.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new PopupHandler(scope, element, attributes)
    });

}  