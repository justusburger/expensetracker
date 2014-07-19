using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class Tag
    {
        [Key, Column(Order = 1), DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Text { get; set; }

        [Key, Column(Order = 2)]
        public int ExpenseId { get; set; }
        [Required]
        public virtual Expense Expense { get; set; }
    }
}