using ExpenseTracker.Model;

namespace ExpenseTracker.Logic
{
    public class ExpenseDataProviderResults : DataProviderResults<Expense>
    {
        public decimal Total { get; set; }
        public decimal AveragePerDay { get; set; }
    }
}