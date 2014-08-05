using System;

namespace ExpenseTracker.Logic
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