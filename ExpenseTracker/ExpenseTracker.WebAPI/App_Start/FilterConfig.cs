﻿using System.Web;
using System.Web.Mvc;
using ExpenseTracker.WebAPI.Exceptions;

namespace ExpenseTracker.WebAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}