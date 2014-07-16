using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Helpers
{
    public class ExpenseTrackerDbContext : DbContext
    {
        public IDbSet<User> Users { get; set; }
        public IDbSet<ExpenseType> ExpenseTypes { get; set; } 
        public IDbSet<Expense> Expenses { get; set; } 
        
    }
}