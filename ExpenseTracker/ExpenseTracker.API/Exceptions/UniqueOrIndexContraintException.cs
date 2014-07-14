using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ExpenseTracker.API.Exceptions
{
    [Serializable]
    public class UniqueOrIndexContraintException : Exception
    {
        public UniqueOrIndexContraintException()
        {
        }

        public UniqueOrIndexContraintException(string message) : base(message)
        {
        }

        public UniqueOrIndexContraintException(string message, Exception inner) : base(message, inner)
        {
        }

        protected UniqueOrIndexContraintException(SerializationInfo info,StreamingContext context) : base(info, context)
        {
        }
    }

}