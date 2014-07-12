module ExpenseTracker {

    export interface IDirectiveScope extends ng.IScope {
        $directive: DirectiveBase;
    }

    export class DirectiveBase extends Component {

        public scope: IDirectiveScope;
        public element: JQuery;
        public attributes: ng.IAttributes;

        constructor(scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
            super();
            this.scope = <IDirectiveScope>scope;
            this.element = element;
            this.attributes = attributes;

            this.scope.$directive = this;
        }

    }

} 