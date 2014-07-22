using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class ExpenseDataProviderResults : DataProviderResults<Expense>
    {
        public decimal Total { get; set; }
        public decimal AveragePerDay { get; set; }
    }
}