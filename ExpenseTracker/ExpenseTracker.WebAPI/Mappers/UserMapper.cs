using System;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Mappers
{
    public static class UserMapper
    {
        public static User ToEntity(this UserViewModel viewModel)
        {
            return new User
            {
                Name = viewModel.Name,
                Email = viewModel.Email,
                Country = viewModel.Country,
                Currency = viewModel.Currency,
                NewsletterSignup = viewModel.NewsletterSignup
            };
        }
        

        public static UserViewModel ToViewModel(this User user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Currency = user.Currency != null ? user.Currency.ToUpperInvariant() : null,
                Country = user.Country != null ? user.Country.ToUpperInvariant() : null,
                NewsletterSignup = user.NewsletterSignup
            };
        }

    }
}