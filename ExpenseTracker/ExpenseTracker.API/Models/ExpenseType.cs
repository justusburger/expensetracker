using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class ExpenseType
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
    }
}