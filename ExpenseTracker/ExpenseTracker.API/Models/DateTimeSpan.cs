using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class DateTimeSpan
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }

        public int DaysSafe
        {
            get
            {
                var timespan = To - From;
                if (timespan.Days < 1)
                    return 1;
                return timespan.Days;
            }
        }
    }
}