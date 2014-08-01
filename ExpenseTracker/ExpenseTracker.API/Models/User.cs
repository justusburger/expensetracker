using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        [MinLength(3)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Hash { get; set; }

        [Required]
        [MaxLength(100)]
        public string Salt { get; set; }

        [MaxLength(100)]
        public string EmailVerificationToken { get; set; }

        [MaxLength(100)]
        public string PasswordResetToken { get; set; }

        public DateTime? EmailVerificationDate { get; set; }

        public DateTime RegistrationDate { get; set; }
        public bool NewsletterSignup { get; set; }
        public bool Locked { get; set; }
        public int InvalidAuthentications { get; set; }

        [Required]
        [MaxLength(10)]
        public string Country { get; set; }

        [Required]
        [MaxLength(10)]
        public string Currency { get; set; }

        public virtual ICollection<Expense> Expenses { get; set; } 
    }
}