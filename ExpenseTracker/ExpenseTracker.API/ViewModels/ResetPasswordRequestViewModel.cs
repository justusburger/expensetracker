using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class ResetPasswordRequestViewModel
    {
        public string Email { get; set; }
        public string Challenge { get; set; }
        public string Response { get; set; }
    }
}