using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Helpers
{
    public static class UserMapper
    {
        public static User ToEntity(this RegistrationForm form)
        {
            return new User
            {
                Name = form.Name,
                Email = form.Email,
                NewsletterSignup = form.NewsletterSignup
            };
        }
    }
}