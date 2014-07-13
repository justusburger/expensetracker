using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class ErrorResponse
    {
        public List<string> Errors { get; set; }
    }
}