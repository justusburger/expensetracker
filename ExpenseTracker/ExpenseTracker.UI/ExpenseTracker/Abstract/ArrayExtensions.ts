interface Array<T> {
    remove(element: any): T[];
    any(selector?: (element) => boolean): boolean;
}

module ExpenseTracker.Extensions {
    
    export class ArrayExtensions {
        
        public static remove(element: any): any[] {
            var self = (<any[]>(<any>this));
            var index = self.indexOf(element);
            self.splice(index, 1);
            return self;
        }

        public static any(selector?: (element) => boolean): boolean {
            var self = (<any[]>(<any>this));
            return Enumerable.From(self).Any(selector);
        }

    }

    Array.prototype.remove = ArrayExtensions.remove;
    Array.prototype.any = ArrayExtensions.any;

}

