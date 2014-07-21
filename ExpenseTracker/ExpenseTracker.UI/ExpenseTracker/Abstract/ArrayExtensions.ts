interface Array<T> {
    remove(element: any): T[];
    any(selector?: (element) => boolean): boolean;
    select(selector: (element) => any): any[];
    first(): any;
    last(): any;
    pushRange(range: any[]): T[];
    contains(item: any): boolean;
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

        public static first(): any {
            var self = (<any[]>(<any>this));
            return self[0];
        }

        public static last(): any {
            var self = (<any[]>(<any>this));
            return self[self.length - 1];
        }

        public static pushRange(range: any[]): any[] {
            var self = (<any[]>(<any>this));
            if (!Enumerable.From(range).Any())
                return self;

            range.forEach(value => self.push(value));

            return self;
        }

        public static contains(item: any): boolean {
            var self = (<any[]>(<any>this));
            return self.indexOf(item) > -1;
        }

    }

    Array.prototype.remove = ArrayExtensions.remove;
    Array.prototype.any = ArrayExtensions.any;
    Array.prototype.select = ArrayExtensions.select;
    Array.prototype.first = ArrayExtensions.first;
    Array.prototype.last = ArrayExtensions.last;
    Array.prototype.pushRange = ArrayExtensions.pushRange;
    Array.prototype.contains = ArrayExtensions.contains;

}

