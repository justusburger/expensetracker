using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;
using ExpenseTracker.Logic.Helpers;
using ExpenseTracker.Logic.Managers;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.Helpers;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Controllers
{
    public abstract class  ControllerBase : ApiController
    {
        private IUserManager _userManager;
        public IUserManager UserManager
        {
            get { return _userManager ?? (_userManager = new UserManager()); }
            set { _userManager = value; }
        }

        private IExpenseManager _expenseManager;
        public IExpenseManager ExpenseManager
        {
            get { return _expenseManager ?? (_expenseManager = new ExpenseManager()); }
            set { _expenseManager = value; }
        }

        private IEmailHelper _emailHelper;
        public IEmailHelper EmailHelper
        {
            get { return _emailHelper ?? (_emailHelper = new EmailHelper()); }
            set { _emailHelper = value; }
        }

        private IPasswordComplexityHelper _passwordComplexityHelper;
        public IPasswordComplexityHelper PasswordComplexityHelper
        {
            get { return _passwordComplexityHelper ?? (_passwordComplexityHelper = new PasswordComplexityHelper()); }
            set { _passwordComplexityHelper = value; }
        }

        private User _currentUser;
        public User CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    IEnumerable<string> headers;
                    if(!ControllerContext.Request.Headers.TryGetValues("X-Auth", out headers) || headers == null || !headers.Any())
                        throw new UnauthenticatedException();

                    _currentUser = UserManager.GetBySessionToken(headers.First());
                    if(_currentUser == null)
                        throw new UnauthenticatedException();
                }

                return _currentUser;
            }
            set { _currentUser = value; }
        }

        [System.Web.Http.NonAction]
        public HttpResponseMessage Created<T>(T model)
        {
            return ControllerContext.Request.CreateResponse(HttpStatusCode.Created, model);
        }
        
        [System.Web.Http.NonAction]
        public HttpResponseMessage OK<T>(T model)
        {
            return ControllerContext.Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }
}
