﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using Nancy;
using Nancy.Authentication.Stateless;
using Nancy.Bootstrapper;
using Nancy.TinyIoc;

namespace ExpenseTracker.API
{
    public class Bootstrap : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
            StatelessAuthentication.Enable(pipelines, new StatelessAuthenticationConfiguration(ctx => MemorySessions.GetCurrentUser(ctx.Request)));
            MemorySessions.Enable(pipelines); 
        }
    }
}