using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ExpenseTracker.Logic.Managers;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.Controllers;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.Helpers;
using ExpenseTracker.WebAPI.ViewModels;
using Moq;
using NUnit.Framework;

namespace ExpenseTracker.WebAPI.Tests.Controllers
{
    [TestFixture]
    public class UserControllerTests : ControllerTestBase
    {
        private UserController _controller;
        private Mock<IUserManager> _userManager;
        private Mock<IEmailHelper> _emailHelper;

        [SetUp]
        public void SetUp()
        {
            _controller = new UserController();
            _controller.ControllerContext = GetControllerContext();

            _userManager = new Mock<IUserManager>(MockBehavior.Strict);
            _controller.UserManager = _userManager.Object;

            _emailHelper = new Mock<IEmailHelper>(MockBehavior.Strict);
            _controller.EmailHelper = _emailHelper.Object;
        }

        [Test]
        public void Get__should_return_current_user_view_model()
        {
            //Arrange
            User user = new User { Name = "John Doe", Country = "US", Currency = "USD" };
            _controller.CurrentUser = user;
            //Act
            UserViewModel result = _controller.Get();
            //Assert
            Assert.AreEqual(user.Name, result.Name);
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void Register__should_return_bad_request_if_modelstate_invalid()
        {
            //Arrange
            var model = new UserViewModel();
            _controller.ModelState.AddModelError("email", "Email is reuired");
            //Act
            var result = _controller.Register(model);
            //Assert
            Assert.Fail();
        }

        [Test, ExpectedException(typeof(TermsAndConditionsNotAcceptedException))]
        public void Register__should_throw_exception_is_terms_not_accepted()
        {
            //Arrange
            var model = new UserViewModel { AcceptsTermsAndConditions = false };
            //Act
            var result = _controller.Register(model);
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Register__should_create_user_and_sends_email_verification()
        {
            //Arrange
            var model = new UserViewModel { AcceptsTermsAndConditions = true, Password = "P@ssw0rd" };
            var user = new User { Name = "John Doe", Email = "john@email.com", EmailVerificationToken = "1234" };
            _userManager.Setup(a => a.Create(It.IsAny<User>(), "P@ssw0rd")).Returns(user);
            _emailHelper.Setup(a => a.SendEmailAddressVerificationEmail(user.Name, user.Email, user.EmailVerificationToken));
            //Act
            var result = _controller.Register(model);
            //Assert
            _emailHelper.VerifyAll();
            _userManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void Update__should_return_bad_request_if_modelstate_invalid()
        {
            //Arrange
            var model = new UserViewModel();
            _controller.ModelState.AddModelError("email", "Email is reuired");
            //Act
            UserViewModel result = _controller.Update(model);
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Update__should_update_user()
        {
            //Arrange
            var model = new UserViewModel { Password = "P@ssw0rd" };
            _controller.CurrentUser = new User();
            _userManager.Setup(a => a.Update(_controller.CurrentUser, It.IsAny<User>(), "P@ssw0rd"));
            //Act
            UserViewModel result = _controller.Update(model);
            //Assert
            _userManager.VerifyAll();
        }

        [Test]
        public void ResetPassword__should_reset_add_reset_token_and_send_verification_email()
        {
            //Arrange
            _controller.CurrentUser = new User { Name = "John Doe", Email = "john@email.com", PasswordResetToken = "1234" };
            _userManager.Setup(a => a.CreateNewResetPasswordToken(_controller.CurrentUser));
            _emailHelper.Setup(a => a.SendPasswordResetVerificationEmail(_controller.CurrentUser.Name, _controller.CurrentUser.Email, _controller.CurrentUser.PasswordResetToken ));
            //Act
            _controller.ResetPassword();
            //Assert
            _userManager.VerifyAll();
            _emailHelper.VerifyAll();
        }

        [Test, ExpectedException(typeof(ResetPasswordTokenInvalidException))]
        public void VerifyResetPassword__should_throw_exception_if_no_user_found_with_supplied_reset_password_token()
        {
            //Arrange
            _userManager.Setup(a => a.VerifyResetPassword("1234")).Returns(default(User));
            //Act
            var result = _controller.VerifyResetPassword("1234");
            //Assert
            Assert.Fail();
        }

        [Test]
        public void VerifyResetPassword__should_return_new_session_token_if_user_found_with_reset_password_token()
        {
            //Arrange
            var user = new User {SessionToken = "6789"};
            _userManager.Setup(a => a.VerifyResetPassword("1234")).Returns(user);
            _userManager.Setup(a => a.CreateNewSessionToken(user));
            //Act
            string result = _controller.VerifyResetPassword("1234");
            //Assert
            Assert.AreEqual(user.SessionToken, result);
            _userManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(EmailVerificationTokenInvalidException))]
        public void VerifyEmail__should_throw_exception_if_no_user_found_with_supplied_email_token()
        {
            //Arrange
            _userManager.Setup(a => a.VerifyEmail("1234")).Returns(default(User));
            //Act
            var result = _controller.VerifyEmail("1234");
            //Assert
            Assert.Fail();
        }

        [Test]
        public void VerifyEmail__should_return_new_session_token_if_user_found_with_email_verification_token()
        {
            //Arrange
            var user = new User { SessionToken = "6789" };
            _userManager.Setup(a => a.VerifyEmail("1234")).Returns(user);
            _userManager.Setup(a => a.CreateNewSessionToken(user));
            //Act
            string result = _controller.VerifyEmail("1234");
            //Assert
            Assert.AreEqual(user.SessionToken, result);
            _userManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void SignIn__should_return_bad_request_when_model_not_valid()
        {
            //Arrange
            _controller.ModelState.AddModelError("Email", "Email is required");
            //Act
            string response = _controller.SignIn(new SessionViewModel());
            //Assert
            Assert.Fail();
        }

        [Test, ExpectedException(typeof(IncorrectUsernamePasswordCombinationException))]
        public void SignIn__should_thow_exception_when_user_not_found()
        {
            //Arrange
            _userManager.Setup(a => a.GetByEmail(It.IsAny<string>())).Returns(default(User));
            //Act
            string response = _controller.SignIn(new SessionViewModel());
            //Assert
            Assert.Fail();
        }

        [Test, ExpectedException(typeof(EmailAddressNotVerifiedException))]
        public void SignIn__should_thow_exception_when_user_email_not_verified()
        {
            //Arrange
            var user = new User();
            _userManager.Setup(a => a.GetByEmail(It.IsAny<string>())).Returns(user);
            //Act
            string response = _controller.SignIn(new SessionViewModel());
            //Assert
            Assert.Fail();
        }

        [Test, ExpectedException(typeof(UserAccountLockedException))]
        public void SignIn__should_thow_exception_when_user_account_locked()
        {
            //Arrange
            var user = new User
            {
                EmailVerificationDate = DateTime.Now,
                Locked = true
            };
            _userManager.Setup(a => a.GetByEmail(It.IsAny<string>())).Returns(user);
            //Act
            string response = _controller.SignIn(new SessionViewModel());
            //Assert
            Assert.Fail();
        }

        [Test]
        public void SignIn__should_thow_exception_and_increase_unauth_count_when_password_incorrect()
        {
            //Arrange
            var user = new User { EmailVerificationDate = DateTime.Now, InvalidAuthentications = 4 };
            _userManager.Setup(a => a.GetByEmail(It.IsAny<string>())).Returns(user);
            _userManager.Setup(a => a.HasPassword(user, It.IsAny<string>())).Returns(false);
            _userManager.Setup(a => a.SaveChanges());
            //Act
            try
            {
                string response = _controller.SignIn(new SessionViewModel());
                Assert.Fail();
            }
            catch (IncorrectUsernamePasswordCombinationException ex)
            {
                //Assert
                Assert.AreEqual(5, user.InvalidAuthentications);
                Assert.IsTrue(user.Locked);
                _userManager.VerifyAll();
            }
        }

        [Test]
        public void SignIn__should_return_session_token_when_password_correct()
        {
            //Arrange
            var model = new SessionViewModel { Email = "john@email.com", Password = "P@ssw0rd" };
            var user = new User { EmailVerificationDate = DateTime.Now, SessionToken = "1234" };
            _userManager.Setup(a => a.GetByEmail(model.Email)).Returns(user);
            _userManager.Setup(a => a.HasPassword(user, model.Password)).Returns(true);
            _userManager.Setup(a => a.CreateNewSessionToken(user));
            //Act
            string response = _controller.SignIn(model);
            //Assert
            Assert.AreEqual(0, user.InvalidAuthentications);
            Assert.AreEqual("1234", response);
            _userManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(UnauthenticatedException))]
        public void CurrentUser__should_throw_unauthenticated_exception_if_no_auth_token_found()
        {
            //Arrange
            //Act
            User user = _controller.CurrentUser;
            //Assert
        }

        [Test, ExpectedException(typeof(UnauthenticatedException))]
        public void CurrentUser__should_throw_unauthenticated_exception_if_no_user_found_with_supplied_auth_token()
        {
            //Arrange
            _controller.ControllerContext.Request.Headers.Add("X-Auth", "1234");
            _userManager.Setup(a => a.GetBySessionToken("1234")).Returns(default(User));
            //Act
            User user = _controller.CurrentUser;
            //Assert
        }

        [Test]
        public void CurrentUser__should_return_user_if_user_found_with_matching_auth_token()
        {
            //Arrange
            var internalUser = new User { SessionTokenExpirationDate = DateTime.Now.AddDays(1) };
            _controller.ControllerContext.Request.Headers.Add("X-Auth", "1234");
            _userManager.Setup(a => a.GetBySessionToken("1234")).Returns(internalUser);
            //Act
            User user = _controller.CurrentUser;
            //Assert
            Assert.AreSame(internalUser, user);
        }

        [Test]
        public void SignOut__should_do_nothing_if_user_unauthed()
        {
            //Arrange
            _controller.ControllerContext.Request.Headers.Add("X-Auth", "1234");
            _userManager.Setup(a => a.GetBySessionToken("1234")).Returns(default(User));
            //Act
            _controller.SignOut();
            //Assert
            _userManager.VerifyAll();
        }

        [Test]
        public void SignOut__should_remove_session_token_if_user_authed()
        {
            //Arrange
            var user = new User { SessionToken = "1234", SessionTokenExpirationDate = DateTime.Now };
            _controller.ControllerContext.Request.Headers.Add("X-Auth", "1234");
            _userManager.Setup(a => a.GetBySessionToken("1234")).Returns(user);
            _userManager.Setup(a => a.SaveChanges());
            //Act
            _controller.SignOut();
            //Assert
            Assert.IsNull(user.SessionToken);
            Assert.IsNull(user.SessionTokenExpirationDate);
            _userManager.VerifyAll();
        }

        [Test]
        public void EmailUnique__should_return_true_if_email_unique()
        {
            //Arrange
            _userManager.Setup(a => a.GetByEmail("john@email.com")).Returns(default(User));
            //Act
            bool unique = _controller.EmailUnique("john@email.com");
            //Assert
            Assert.IsTrue(unique);
        }

        [Test]
        public void EmailUnique__should_return_true_if_current_user_has_supplied_email()
        {
            //Arrange
            var user = new User {Id = 123};
            _controller.CurrentUser = user;
            _userManager.Setup(a => a.GetByEmail("john@email.com")).Returns(user);
            //Act
            bool unique = _controller.EmailUnique("john@email.com");
            //Assert
            Assert.IsTrue(unique);
            _userManager.VerifyAll();
        }

        [Test]
        public void EmailUnique__should_return_false_email_not_unique_and_user_not_authed()
        {
            //Arrange
            var user = new User {Id = 123};
            _userManager.Setup(a => a.GetByEmail("john@email.com")).Returns(user);
            //Act
            bool unique = _controller.EmailUnique("john@email.com");
            //Assert
            Assert.IsFalse(unique);
            _userManager.VerifyAll();
        }

        [Test]
        public void EmailUnique__should_return_false_email_not_unique_and_current_email_does_not_match()
        {
            //Arrange
            var user = new User {Id = 123};
            _controller.CurrentUser = new User { Id = 334 };
            _userManager.Setup(a => a.GetByEmail("john@email.com")).Returns(user);
            //Act
            bool unique = _controller.EmailUnique("john@email.com");
            //Assert
            Assert.IsFalse(unique);
            _userManager.VerifyAll();
        }
    }
}
