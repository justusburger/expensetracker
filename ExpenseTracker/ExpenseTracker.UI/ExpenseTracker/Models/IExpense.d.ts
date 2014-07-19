﻿declare module ExpenseTracker.Models {

    export interface IExpense {

        id: number;
        userId: number;
        date: Date;
        amount: number;
        description: string;
        tags: string[];

    }

}  