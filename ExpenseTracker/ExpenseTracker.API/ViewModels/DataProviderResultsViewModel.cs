using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class DataProviderResultsViewModel<T>
    {
        public IEnumerable<T> Items { get; set; }
        public DataProviderQueryViewModel Query { get; set; }
    }
}