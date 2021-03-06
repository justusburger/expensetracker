﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Model
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }

        [MaxLength(100)]
        [Required]
        public string Description { get; set; }

        [MaxLength(1000)]
        public string Comment { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        public Expense()
        {
            Tags = new HashSet<Tag>();
        }
    }
}