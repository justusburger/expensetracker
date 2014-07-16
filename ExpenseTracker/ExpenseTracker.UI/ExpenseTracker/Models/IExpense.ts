declare module ExpenseTracker.Models {

    export interface IExpense {

        id: number;
        expenseTypeId: number;
        userId: number;
        date: Date;
        amount: number;
        description: string;

    }

}  