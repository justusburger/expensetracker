using System;
using System.Linq;
using System.Security.Principal;
using ExpenseTracker.API.Managers;
using ExpenseTracker.Logic.Helpers;
using ExpenseTracker.Model;

namespace ExpenseTracker.Logic.Managers
{
    public interface IUserManager : IManager<User>
    {
        User Create(User entity, string password);
        User GetByEmail(string email);
        bool HasPassword(User user, string password);
        void Update(User currentUser, User user, string newPassword);
        User VerifyEmail(string emailToken);
        User VerifyResetPassword(string resetToken);
        void CreateNewResetPasswordToken(User user);
        User GetBySessionToken(string sessionToken);
        void CreateNewSessionToken(User user);
    }

    public class UserManager : ManagerBase<User>, IUserManager
    {
        public User Create(User entity, string password)
        {
            entity.RegistrationDate = DateTime.Now;
            entity.Salt = CryptoHelper.GenerateSalt();
            entity.Hash = GenerateHash(entity.Salt, password);
            entity.EmailVerificationDate = null;
            entity.EmailVerificationToken = CryptoHelper.GenerateSalt();
            entity.Country = "US";
            entity.Currency = "USD";
            
            return Create(entity);
        }

        public string GenerateHash(string salt, string password)
        {
            return CryptoHelper.MD5(salt + password);
        }

        public User GetByEmail(string email)
        {
            User user = Context.Users.SingleOrDefault(u => u.Email == email);
            return user;
        }

        public bool HasPassword(User user, string password)
        {
            var hash = GenerateHash(user.Salt, password);
            return hash == user.Hash;
        }

        public void Update(User currentUser, User user, string newPassword)
        {
            currentUser.Name = user.Name;
            currentUser.Email = user.Email;
            currentUser.NewsletterSignup = user.NewsletterSignup;
            currentUser.Country = user.Country;
            currentUser.Currency = user.Currency;

            if (!String.IsNullOrEmpty(newPassword))
                currentUser.Hash = GenerateHash(currentUser.Salt, newPassword);

            SaveChanges();
        }

        public User VerifyEmail(string emailToken)
        {
            var user = All.SingleOrDefault(u => u.EmailVerificationToken == emailToken);
            if (user != null)
            {
                user.EmailVerificationToken = null;
                user.EmailVerificationDate = DateTime.Now;
                SaveChanges();
            }

            return user;
        }

        public User VerifyResetPassword(string resetToken)
        {
            var user = All.SingleOrDefault(u => u.PasswordResetToken == resetToken);
            if (user != null)
            {
                user.PasswordResetToken = null;
                SaveChanges();
            }

            return user;
        }

        public void CreateNewResetPasswordToken(User user)
        {
            user.PasswordResetToken = CryptoHelper.GenerateSalt();
            SaveChanges();
        }

        public User GetBySessionToken(string sessionToken)
        {
            return All.SingleOrDefault(a => a.SessionToken == sessionToken);
        }

        public void CreateNewSessionToken(User user)
        {
            user.SessionToken = CryptoHelper.GenerateSalt();
            user.SessionTokenExpirationDate = DateTime.Now.AddMonths(1);
            user.InvalidAuthentications = 0;
            SaveChanges();
        }
    }
}