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
        public static User ToEntity(this RegistrationRequestViewModel requestViewModel)
        {
            return new User
            {
                Name = requestViewModel.Name,
                Email = requestViewModel.Email,
                NewsletterSignup = requestViewModel.NewsletterSignup
            };
        }

        public static ViewModels.UserViewModel ToViewModel(this User user)
        {
            return new ViewModels.UserViewModel
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email
            };
        }
    }
}