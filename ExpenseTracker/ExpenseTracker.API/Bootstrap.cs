using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.TinyIoc;

namespace ExpenseTracker.API
{
    public class Bootstrap : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
            Database.SetInitializer(new ExpenseTrackerDatabaseInitializer());
        }
    }
}