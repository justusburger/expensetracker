using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class RegistrationForm
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool AcceptTermsAndConditions { get; set; }
        public bool NewsletterSignup { get; set; }
    }
}