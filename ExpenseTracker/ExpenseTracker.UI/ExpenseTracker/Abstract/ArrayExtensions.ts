interface Array<T> {
    remove(element: any): T[];
    any(selector?: (element) => boolean): boolean;
    select(selector: (element) => any): any[];
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

        public static select(selector: (element) => boolean): any[] {
            var self = (<any[]>(<any>this));
            return Enumerable.From(self).Select(selector).ToArray();
        }

    }

    Array.prototype.remove = ArrayExtensions.remove;
    Array.prototype.any = ArrayExtensions.any;
    Array.prototype.select = ArrayExtensions.select;

}

