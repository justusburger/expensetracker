module ExpenseTracker.Services {

    export class Alert extends Component {

        public static Name: string = 'Alert';
        public queue: Models.IQueuedAlert[];

        constructor() {
            super();
            this.queue = [];
        }

        public success(message: string): void {
            this.queue.push(<Models.IQueuedAlert>{
                type: Models.AlertType.Success, 
                message: message
            });
        }

        public warning(message: string): void {
            this.queue.push(<Models.IQueuedAlert>{
                type: Models.AlertType.Warning,
                message: message
            });
        }

        public error(message: string): void {
            this.queue.push(<Models.IQueuedAlert>{
                type: Models.AlertType.Error,
                message: message
            });
        }

    }

    angular.module('ExpenseTracker.Services').factory(Alert.Name, () => new Alert());

}   