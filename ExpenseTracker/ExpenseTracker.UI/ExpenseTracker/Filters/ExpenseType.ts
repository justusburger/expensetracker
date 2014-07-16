module ExpenseTracker.Filters {
    
    export class ExpenseType extends Component {
        
        public static Name: string = "expenseType";

        public filter(value: any, expenseTypes: Models.IExpenseType[]): string {
            if (typeof value == 'undefined' || value == null || !angular.isNumber(value) || !Enumerable.From(expenseTypes).Any())
                return undefined;

            if (typeof this.cacheService.expenseTypeNameDictionary[value] === 'undefined') 
                Enumerable.From(expenseTypes).ForEach((e: Models.IExpenseType) => this.cacheService.expenseTypeNameDictionary[e.id] = e.title);
            
            return this.cacheService.expenseTypeNameDictionary[value];
        }

    }

    angular.module('ExpenseTracker.Filters').filter(ExpenseType.Name, () => {
        var handler = new ExpenseType();
        return (value, expenseTypes) => handler.filter(value, expenseTypes);
    });

} 