module ExpenseTracker.Directives {

    export class AlertHandler extends DirectiveBase {

        public static Name: string = 'alertHandler';
        public static TemplateUrl: string = 'ExpenseTracker/Views/AlertHandler.html';
        private _currentAlert: Models.IQueuedAlert;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            this.scope.$watchCollection(() => this.alertService.queue, () => this.displayAlert());
        }

        public displayAlert(): void {
            if (!Enumerable.From(this.alertService.queue).Any())
                return;
            var alert: Models.IQueuedAlert = this.alertService.queue.shift();
            var alertItem = $('<div class="alert"></div>').html(alert.message).hide();
            if (alert.type === Models.AlertType.Success)
                alertItem.addClass('alert-success');
            if (alert.type === Models.AlertType.Warning)
                alertItem.addClass('alert-warning');
            if (alert.type === Models.AlertType.Error)
                alertItem.addClass('alert-danger');
            this.element.append(alertItem);
            alertItem.css('margin-left', '-' + (alertItem.outerWidth() / 2) + 'px').fadeIn(200);
            this.timeoutService(() => alertItem.fadeOut(2000, () => alertItem.remove()), 4000);
        }

    }

    angular.module('ExpenseTracker.Directives').directive(AlertHandler.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: AlertHandler.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new AlertHandler(scope, element, attributes)
    });

}  