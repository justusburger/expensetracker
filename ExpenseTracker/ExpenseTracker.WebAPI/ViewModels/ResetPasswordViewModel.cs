using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class ResetPasswordViewModel
    {
        public string Name { get; set; }
        public string VerificationLink { get; set; }
    }
}