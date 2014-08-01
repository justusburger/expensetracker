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
        User Create(User entity, string password);
        User GetByEmail(string email);
        bool HasPassword(User user, string password);
        User Update(int userId, User user, string newPassword);
        User VerifyEmail(string emailToken);
        User VerifyResetPassword(string resetToken);
        string GetResetPasswordToken(User user);
    }

    public class UserManager : ManagerBase<User>, IUserManager
    {
        public User Create(User entity, string password)
        {
            entity.RegistrationDate = DateTime.Now;
            /* Password salting and hashing */
            entity.Salt = CryptoHelper.GenerateSalt();
            entity.Hash = GenerateHash(entity.Salt, password);

            /* Email verification */
            entity.EmailVerificationDate = null;
            entity.EmailVerificationToken = CryptoHelper.GenerateSalt();
            var emailHelper = new EmailHelper();
            emailHelper.SendRegistrationEmailVerification(entity.Name, entity.Email, entity.EmailVerificationToken);

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

        public User Update(int userId, User user, string newPassword)
        {
            var originalEntity = All.Single(u => u.Id == userId);
            originalEntity.Name = user.Name;
            originalEntity.Email = user.Email;
            originalEntity.NewsletterSignup = user.NewsletterSignup;
            originalEntity.Country = user.Country;
            originalEntity.Currency = user.Currency;

            if (!String.IsNullOrEmpty(newPassword))
                originalEntity.Hash = GenerateHash(originalEntity.Salt, newPassword);

            SaveChanges();
            return originalEntity;
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

        public string GetResetPasswordToken(User user)
        {
            user.PasswordResetToken = CryptoHelper.GenerateSalt();
            SaveChanges();
            return user.PasswordResetToken;
        }
    }
}