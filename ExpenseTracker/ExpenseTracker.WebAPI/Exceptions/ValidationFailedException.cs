using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http.ModelBinding;
using WebGrease.Css.Extensions;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class ValidationFailedException : Exception, IApplicationException
    {
        private ModelStateDictionary _modelState;
        public ValidationFailedException(ModelStateDictionary modelState)
        {
            _modelState = modelState;
        }
        
        public new string Message
        {
            get
            {
                var result = "";
                foreach (KeyValuePair<string, ModelState> field in _modelState)
                {
                    if(field.Value.Errors.Any())
                        field.Value.Errors.ForEach(e => result += e.ErrorMessage + " ");
                }
                return result;
            }
        }

        public HttpStatusCode StatusCode { get { return HttpStatusCode.BadRequest; } }
    }
}