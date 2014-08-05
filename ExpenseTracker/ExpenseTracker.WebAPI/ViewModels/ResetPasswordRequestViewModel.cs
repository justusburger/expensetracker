using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class ResetPasswordRequestViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Challenge { get; set; }

        [Required]
        public string Response { get; set; }
    }
}