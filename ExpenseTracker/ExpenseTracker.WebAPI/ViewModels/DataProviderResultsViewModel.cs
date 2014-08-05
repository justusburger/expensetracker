using System.Collections.Generic;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class DataProviderResultsViewModel<T>
    {
        public IEnumerable<T> Items { get; set; }
        public DataProviderQueryViewModel Query { get; set; }
    }
}