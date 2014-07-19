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
        public IDbSet<Tag> Tags { get; set; } 
        public IDbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Expense>().HasMany(a => a.Tags).WithRequired(t => t.Expense);
        }
    }
}