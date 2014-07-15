using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}