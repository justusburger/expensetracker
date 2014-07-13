module ExpenseTracker {

    export class NotImplementedException {

        public message: string;

        constructor(message: string) {
            this.message = message;
        }

        public toString(): string {
            return 'Not implemented exception: ' + this.message;
        } 

    }

} 