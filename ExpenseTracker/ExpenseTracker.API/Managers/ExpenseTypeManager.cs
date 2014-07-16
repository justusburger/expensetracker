using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Managers
{
    public interface IExpenseTypeManager : IManager<ExpenseType>
    {
        IQueryable<ExpenseType> AllByUser(int userId);
        ExpenseType GetById(int userId, int id);
        ExpenseType Create(int userId, ExpenseType entity);
        void Delete(int userId, int id);
    }

    public class ExpenseTypeManager : ManagerBase<ExpenseType>, IExpenseTypeManager
    {
        public IQueryable<ExpenseType> AllByUser(int userId)
        {
            return All.Where(e => e.UserId == userId);
        }

        public ExpenseType GetById(int userId, int id)
        {
            return AllByUser(userId).SingleOrDefault(e => e.Id == id);
        }

        public ExpenseType Create(int userId, ExpenseType entity)
        {
            entity.UserId = userId;
            entity.Id = 0;
            return Create(entity);
        }

        public void Delete(int userId, int id)
        {
            var entity = GetById(userId, id);
            Context.Entry(entity).State = EntityState.Deleted;
            SaveChanges();
        }
    }
}