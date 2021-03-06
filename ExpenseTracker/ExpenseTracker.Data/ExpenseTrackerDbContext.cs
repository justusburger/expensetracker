﻿using System.Data.Entity;
using ExpenseTracker.Data.Abstract;
using ExpenseTracker.Model;

namespace ExpenseTracker.Data
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