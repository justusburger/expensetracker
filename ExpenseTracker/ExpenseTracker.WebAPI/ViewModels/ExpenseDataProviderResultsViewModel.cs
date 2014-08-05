using ExpenseTracker.API.ViewModels;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class ExpenseDataProviderResultsViewModel : DataProviderResultsViewModel<ExpenseViewModel>
    {
        public decimal Total { get; set; }
        public decimal AveragePerDay { get; set; }
    }
}