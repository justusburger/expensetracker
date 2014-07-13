using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Helpers
{
    public class ExpenseTrackerDbContext : DbContext
    {
        public IDbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}