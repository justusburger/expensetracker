using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class UserAvailableOptionsViewModel
    {
        public Dictionary<string, string> Countries { get; set; }
        public Dictionary<string, string> Currencies { get; set; } 
    }
}