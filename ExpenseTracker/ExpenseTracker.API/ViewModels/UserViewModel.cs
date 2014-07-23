using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.Security;

namespace ExpenseTracker.API.ViewModels
{
    public class UserViewModel : IUserIdentity
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Claims { get; private set; }
        public string Currency { get; set; }
    }
}