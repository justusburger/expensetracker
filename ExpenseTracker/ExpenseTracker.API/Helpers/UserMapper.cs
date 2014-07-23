using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
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
                NewsletterSignup = requestViewModel.NewsletterSignup,
                Country = "US", //Defaults for registration
                Currency = "USD" //Defaults for registration
            };
        }
        public static User ToEntity(this FullProfileViewModel viewModel)
        {
            return new User
            {
                Id = viewModel.Id,
                Name = viewModel.UserName,
                Email = viewModel.Email,
                NewsletterSignup = viewModel.NewsletterSignup,
                Country = viewModel.Country.ToUpper(),
                Currency = viewModel.Currency.ToUpper()
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

        public static ViewModels.FullProfileViewModel ToFullViewModel(this User user)
        {
            return new FullProfileViewModel
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email,
                Country = user.Country.ToLower(),
                Currency = user.Currency.ToLower(),
                AvailableCurrencies = Currency.AvailableCurrencies,
                AvailableCountries = Country.AvailableCountries,
                NewsletterSignup = user.NewsletterSignup
            };
        }
    }
}