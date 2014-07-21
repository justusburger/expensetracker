using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using ExpenseTracker.API.Abstract;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Helpers
{
    public interface IExpenseTrackerDbContext : IDbContext
    {
        IDbSet<User> Users { get; set; }
        IDbSet<Tag> Tags { get; set; }
        IDbSet<Expense> Expenses { get; set; }
    }

    public class ExpenseTrackerDbContext : DbContext, IExpenseTrackerDbContext
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