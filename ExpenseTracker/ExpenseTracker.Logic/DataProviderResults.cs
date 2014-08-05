using System.Collections.Generic;

namespace ExpenseTracker.Logic
{
    public class DataProviderResults<T>
    {
        public IEnumerable<T> Items { get; set; }
        public DataProviderQuery Query { get; set; }
    }
}