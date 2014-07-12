module ExpenseTracker {

    export class ArgumentException {

        public argument: string;
        public message: string;

        constructor(argument: string, message: string) {
            this.argument = argument;
            this.message = message;
        }

        public toString(): string {
            return 'Argument exception: ' + this.argument + '. ' + this.message;
        }

    }

} 