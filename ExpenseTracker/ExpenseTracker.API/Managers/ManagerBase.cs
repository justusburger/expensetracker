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
        T Create(T entity);
        T GetById(int entityId);
        void SaveChanges();
    }

    public abstract class ManagerBase<T> : IManager<T> where T : class 
    {
        private ExpenseTrackerDbContext _context;
        public ExpenseTrackerDbContext context
        {
            get { return _context ?? (_context = new ExpenseTrackerDbContext()); }
            set { _context = value; }
        }

        public T Create(T entity) 
        {
            context.Set<T>().Add(entity);
            try
            {
                context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                var updateException = ex.InnerException as UpdateException;
                if (updateException != null)
                {
                    var sqlException = updateException.InnerException as SqlException;
                    if(sqlException != null && sqlException.Errors.OfType<SqlError>().Any(se => se.Number == 2601 || se.Number == 2627))
                        throw new UniqueOrIndexContraintException(ex.Message, ex);
                }   
                throw;
            }

            return entity;
        }

        public T GetById(int entityId)
        {
            return context.Set<T>().Find(entityId);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}