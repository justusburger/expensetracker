using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Exceptions;
using ExpenseTracker.API.Helpers;

namespace ExpenseTracker.API.Managers
{
    public interface IManager<T>
    {
        IQueryable<T> All { get; }
        void SaveChanges();
    }

    public abstract class ManagerBase<T> : IManager<T> where T : class 
    {
        private IExpenseTrackerDbContext _context;
        public IExpenseTrackerDbContext Context
        {
            get { return _context ?? (_context = new ExpenseTrackerDbContext()); }
            set { _context = value; }
        }

        public IQueryable<T> All {
            get { return Context.Set<T>(); }
        }

        public T Create(T entity) 
        {
            Context.Set<T>().Add(entity);
            Context.SaveChanges();
            return entity;
        }
        
        public void SaveChanges()
        {
            Context.SaveChanges();
        }

        public void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
            Context.SaveChanges();
        }
    }
}