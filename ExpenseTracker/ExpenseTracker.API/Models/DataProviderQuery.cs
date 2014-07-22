using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class DataProviderQuery
    {
        public int Page { get; set; }
        public int PageSize { get; set; }

        public int PageCount
        {
            get { return Convert.ToInt32(Math.Ceiling(((double)ItemCount/PageSize))); }
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