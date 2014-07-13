using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Managers
{
    public interface IUserManager : IManager<User>
    {
        void Register(User entity, string password);
    }

    public class UserManager : ManagerBase<User>, IUserManager
    {
        public void Register(User entity, string password)
        {
            entity.RegistrationDate = DateTime.Now;
            entity.Salt = CryptoHelper.GenerateSalt();
            entity.Hash = CryptoHelper.MD5(entity.Salt + password);
            Add(entity);
        }
    }
}