using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;

namespace ExpenseTracker.API.Managers
{
    public interface IManager<T>
    {
        T Add(T entity);
    }

    public abstract class ManagerBase<T> : IManager<T> where T : class 
    {
        private ExpenseTrackerDbContext _context;
        public ExpenseTrackerDbContext context
        {
            get { return _context ?? (_context = new ExpenseTrackerDbContext()); }
            set { _context = value; }
        }

        public T Add(T entity)
        {
            context.Set<T>().Add(entity);
            context.SaveChanges();
            return entity;
        }
    }
}