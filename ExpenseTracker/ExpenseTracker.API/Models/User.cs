using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Hash { get; set; }

        [Required]
        [MaxLength(100)]
        public string Salt { get; set; }

        public DateTime RegistrationDate { get; set; }
        public bool NewsletterSignup { get; set; }
        public bool Locked { get; set; }
        public int InvalidAuthentications { get; set; }

        [MaxLength(100)]
        public string AuthenticationToken { get; set; }

        public DateTime? AuthenticationTokenExpiryDate { get; set; }
    }
}