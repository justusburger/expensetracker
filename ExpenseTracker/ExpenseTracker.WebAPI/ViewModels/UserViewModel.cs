using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        public string Currency { get; set; }
        public string Country { get; set; }
        public bool AcceptsTermsAndConditions { get; set; }
        public bool NewsletterSignup { get; set; }
    }
}