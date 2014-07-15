using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Cryptography;
using Nancy.Session;

namespace ExpenseTracker.API.Helpers
{
    public class MemorySessions : IObjectSerializerSelector
    {
        private readonly MemorySessionsConfiguration currentConfiguration;
        private readonly IDictionary<string, IDictionary<string, object>> sessionStore; 
        public static readonly string CookieName = "session";
        public static readonly string NewCookieName = "new-session";

        public MemorySessions(MemorySessionsConfiguration configuration)
        {
            if(configuration == null)
                throw new ArgumentNullException("configuration");

            currentConfiguration = configuration;
            sessionStore = new Dictionary<string, IDictionary<string, object>>();
        }

        public void WithSerializer(IObjectSerializer newSerializer)
        {
            currentConfiguration.Serializer = newSerializer;
        }

        public static IObjectSerializerSelector Enable(IPipelines pipelines)
        {
            var configuration = new MemorySessionsConfiguration
            {
                Serializer = new DefaultObjectSerializer()
            };
            var memorySessionsProvider = new MemorySessions(configuration);
            pipelines.BeforeRequest.AddItemToStartOfPipeline(ctx => LoadSession(ctx, memorySessionsProvider));
            pipelines.AfterRequest.AddItemToEndOfPipeline(ctx => SaveSession(ctx));
            return memorySessionsProvider;
        }

        public static Response LoadSession(NancyContext context, MemorySessions memorySessionsProvider)
        {
            if (context.Request == null)
                return null;

            string sessionKey;
            if (context.Request.Cookies.ContainsKey(CookieName))
                sessionKey = context.Request.Cookies[CookieName];
            else
            {
                sessionKey = CryptoHelper.GenerateSalt();
                context.Request.Cookies.Add(NewCookieName, sessionKey);
            }

            if (!memorySessionsProvider.sessionStore.ContainsKey(sessionKey))
                memorySessionsProvider.sessionStore[sessionKey] = new Dictionary<string, object>();

            context.Request.Session = new Session(memorySessionsProvider.sessionStore[sessionKey]);
            return context.Response;
        }

        public static Response SaveSession(NancyContext context)
        {
            if (context.Request.Cookies.ContainsKey(NewCookieName))
            {
                context.Response.WithCookie(CookieName, context.Request.Cookies[NewCookieName]);
            }
            return context.Response;
        }
        
    }

    public class MemorySessionsConfiguration
    {
        public IObjectSerializer Serializer { get; set; }
    }
}