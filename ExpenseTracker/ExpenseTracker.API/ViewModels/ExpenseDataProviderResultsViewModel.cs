using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class ExpenseDataProviderResultsViewModel : DataProviderResultsViewModel<ExpenseViewModel>
    {
        public decimal Total { get; set; }
        public decimal AveragePerDay { get; set; }
    }
}