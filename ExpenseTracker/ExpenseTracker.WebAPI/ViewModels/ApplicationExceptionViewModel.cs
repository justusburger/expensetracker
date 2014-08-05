using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class ApplicationExceptionViewModel
    {
        public string Type { get; set; }
        public string Message { get; set; }
    }
}