using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ModelBinding;

namespace ExpenseTracker.WebAPI.Helpers
{
    public interface IPasswordComplexityHelper
    {
        void Validate(string password, ModelStateDictionary modelState, PasswordIs required);
    }

    public class PasswordComplexityHelper : IPasswordComplexityHelper
    {
        public void Validate(string password, ModelStateDictionary modelState, PasswordIs required)
        {
            if (required == PasswordIs.NotRequired && string.IsNullOrEmpty(password))
                return;

            if (string.IsNullOrEmpty(password))
                modelState.AddModelError("Password", "The Password field is Required.");
            else if (password.Trim().Length < 6)
                modelState.AddModelError("Password", "The password field must be at least 6 characters long.");
        }
    }

    public enum PasswordIs
    {
        Required,
        NotRequired
    }
}