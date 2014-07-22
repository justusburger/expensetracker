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
                var timespan = new DateTime(To.Year, To.Month, To.Day) - new DateTime(From.Year, From.Month, From.Day);
                return timespan.Days + 1;
            }
        }
    }
}