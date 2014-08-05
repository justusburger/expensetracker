using System.Linq;
using ExpenseTracker.Data;
using ExpenseTracker.Logic.Helpers;

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

        private ICryptoHelper _cryptoHelper;
        public ICryptoHelper CryptoHelper
        {
            get { return _cryptoHelper ?? (_cryptoHelper = new CryptoHelper()); }
            set { _cryptoHelper = value; }
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