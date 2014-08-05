using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Mappers
{
    public static class ApplicationExceptionMapper
    {
        public static ApplicationExceptionViewModel ToViewModel(this IApplicationException exception)
        {
            return new ApplicationExceptionViewModel
            {
                Type = exception.GetType().Name,
                Message = exception.Message
            };
        }
    }
}