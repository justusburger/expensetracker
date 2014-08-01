module ExpenseTracker.Directives {

    interface IRecaptcha {
        create: (publicKey: string, element: any, options: any) => void;
        get_challenge: () => string;
        get_response: () => string;
    }

    declare var Recaptcha: IRecaptcha;

    export class Captcha extends DirectiveBase {

        public static Name: string = 'captcha';
        public static TemplateUrl: string = 'ExpenseTracker/Views/Captcha.html';

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super(scope, element, attributes);

            Recaptcha.create(this.publicKey, element[0], {
                theme: 'clean',
                callback: () => this.created()
            });
        }

        public get publicKey(): string {
            return this.injectorService.get('RECAPTCHA_PUBLIC_KEY');
        }

        public created(): void {
            this.element.find('input[name=recaptcha_response_field]').on('keyup', () => this.scope.$apply(() => this.update()));
        }

        public update(): void {
            if (this.attributes['challenge'])
                this.scope.$eval('$parent.' + this.attributes['challenge'] + ' = challenge', { challenge: Recaptcha.get_challenge() });

            if (this.attributes['response'])
                this.scope.$eval('$parent.' + this.attributes['response'] + ' = response', { response: Recaptcha.get_response() });
        }
         
    }

    angular.module('ExpenseTracker.Directives').directive(Captcha.Name, (): ng.IDirective => <ng.IDirective>{
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: Captcha.TemplateUrl,
        link: (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) => new Captcha(scope, element, attributes)
    });

} 
 