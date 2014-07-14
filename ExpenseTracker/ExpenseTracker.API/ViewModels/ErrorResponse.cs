﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;

namespace ExpenseTracker.API.Models
{
    public class ErrorResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public int ErrorCode { get; set; }
        public string Message { get; set; }

        public ErrorResponse(HttpStatusCode statusCode, int errorCode, string message)
        {
            StatusCode = statusCode;
            ErrorCode = errorCode;
            Message = message;
        }

        public static class Registration
        {
            public static ErrorResponse ACCEPT_TERMS_AND_CONDITIONS_FALSE = new ErrorResponse(HttpStatusCode.ExpectationFailed, 1, "Accepting the terms and conditions is required for registration.");
            public static ErrorResponse EMAIL_ALREADY_REGISTERED = new ErrorResponse(HttpStatusCode.BadRequest, 2, "Email already registered.");
        }


    }
}