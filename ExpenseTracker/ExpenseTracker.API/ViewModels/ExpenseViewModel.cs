using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExpenseTracker.API.ViewModels
{
    public class ExpenseViewModel
    {
        public int Id { get; set; }
        public string[] Tags { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string Comment { get; set; }
    }
}