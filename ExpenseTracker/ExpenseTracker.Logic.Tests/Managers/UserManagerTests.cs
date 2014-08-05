using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExpenseTracker.Data;
using ExpenseTracker.Logic.Helpers;
using ExpenseTracker.Logic.Managers;
using ExpenseTracker.Model;
using Moq;
using NUnit.Framework;

namespace ExpenseTracker.Logic.Tests.Managers
{
    [TestFixture]
    public class UserManagerTests
    {
        private UserManager _manager;
        private Mock<IExpenseTrackerDbContext> _context;
        private Mock<ICryptoHelper> _cryptoHelper;

        [SetUp]
        public void SetUp()
        {
            _manager = new UserManager();
            _context = new Mock<IExpenseTrackerDbContext>(MockBehavior.Strict);
            _manager.Context = _context.Object;

            _cryptoHelper = new Mock<ICryptoHelper>(MockBehavior.Strict);
            _manager.CryptoHelper = _cryptoHelper.Object;
        }

        [Test]
        public void GetByEmail__returns_user_with_matching_email()
        {
            //Arrange
            var internalUser = new User { Email = "john@email.com" };
            IDbSet<User> users = new FakeDbSet<User> { internalUser };
            _context.Setup(a => a.Users).Returns(users);
            //Act
            var user = _manager.GetByEmail("john@email.com");
            //Assert
            Assert.AreSame(internalUser, user);
        }

        [Test]
        public void HasPassword__returns_true_when_passwords_match()
        {
            //Arrange
            var user = new User { Salt = "abcd1234", Hash = "E35959D34DD033095EF970FAFCD2749A" };
            //Act
            var result = _manager.HasPassword(user, "P@ssw0rd");
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void HasPassword__returns_false_when_passwords_do_not_match()
        {
            //Arrange
            var user = new User { Salt = "abcd1234", Hash = "E35959D34DD033095EF970FAFCD2749A" };
            //Act
            var result = _manager.HasPassword(user, "password");
            //Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void CreateNewSessionToken__adds_new_session_token()
        {
            //Arrange
            var user = new User();
            _cryptoHelper.Setup(a => a.GenerateSalt()).Returns("1234");
            _context.Setup(a => a.SaveChanges()).Returns(1);
            //Act
            _manager.CreateNewSessionToken(user);
            //Assert
            Assert.AreEqual("1234", user.SessionToken);
            Assert.IsNotNull(user.SessionTokenExpirationDate);
            Assert.IsTrue(user.SessionTokenExpirationDate > DateTime.Now);
        }
    }
}
