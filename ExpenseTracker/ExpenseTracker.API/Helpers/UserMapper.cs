using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.ViewModels;
using User = ExpenseTracker.API.Models.User;

namespace ExpenseTracker.API.Helpers
{
    public static class UserMapper
    {
        public static User ToEntity(this RegistrationRequest request)
        {
            return new User
            {
                Name = request.Name,
                Email = request.Email,
                NewsletterSignup = request.NewsletterSignup
            };
        }

        public static ViewModels.User ToViewModel(this User user)
        {
            return new ViewModels.User
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email
            };
        }
    }
}