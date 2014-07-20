using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class DataProviderResults<T>
    {
        public IEnumerable<T> Items { get; set; }
        public DataProviderQuery Query { get; set; }
    }
}