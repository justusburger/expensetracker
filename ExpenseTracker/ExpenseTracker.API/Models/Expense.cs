using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        public Expense()
        {
            Tags = new HashSet<Tag>();
        }
    }
}