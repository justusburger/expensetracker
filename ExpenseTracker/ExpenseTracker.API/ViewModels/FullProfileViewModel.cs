using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class FullProfileViewModel : UserViewModel
    {
        public string Country { get; set; }
        public Dictionary<string, string> AvailableCountries { get; set; }
        public Dictionary<string, string> AvailableCurrencies { get; set; }
        public string Password { get; set; }
        public bool NewsletterSignup { get; set; }
    }
}