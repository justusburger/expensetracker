module ExpenseTracker.Services {

    export class Popup extends Component {

        public static Name: string = 'Popup';
        public queue: Models.IPopup[];

        constructor() {
            super();
            this.queue = [];
        }

        public show(popup: Models.IPopup, model?: any): void {
            popup.model = model;
            this.queue.push(angular.copy(popup));
        }
        
    }

    angular.module('ExpenseTracker.Services').factory(Popup.Name, () => new Popup());

}    