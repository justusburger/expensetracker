using System;
using System.Collections.Generic;

namespace ExpenseTracker.Logic
{
    public class DataProviderQuery
    {
        public int Page { get; set; }
        public int PageSize { get; set; }

        public int PageCount
        {
            get
            {
                if (ItemCount == 0)
                    return 0;
                return Convert.ToInt32(Math.Ceiling(((double)ItemCount/PageSize)));
            }
        }

        public int Skip
        {
            get { return (Page - 1) * PageSize; }
        }

        public int Take
        {
            get { return PageSize; }
        }

        public int ItemCount { get; set; }
        public Dictionary<string, string> Filters { get; set; }
        public bool ApplyPagination { get; set; }
    }
}