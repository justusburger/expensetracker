using System;
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
            public static ErrorResponse ACCEPT_TERMS_AND_CONDITIONS_FALSE = new ErrorResponse(HttpStatusCode.ExpectationFailed, 1, "Accepting the terms and conditions is required for registration");
            public static ErrorResponse EMAIL_ALREADY_REGISTERED = new ErrorResponse(HttpStatusCode.BadRequest, 2, "Email already registered");
            public static ErrorResponse EMAIL_VERIFICATION_TOKEN_NOT_FOUND = new ErrorResponse(HttpStatusCode.NotFound, 7, "Email verification token not found");
        }

        public static class SignIn
        {
            public static ErrorResponse ACCOUNT_LOCKED = new ErrorResponse(HttpStatusCode.Forbidden, 3, "Account is locked");
            public static ErrorResponse INCORRECT_DETAILS = new ErrorResponse(HttpStatusCode.Forbidden, 4, "Incorrect details");
            public static ErrorResponse EMAIL_NOT_VERIFIED = new ErrorResponse(HttpStatusCode.Forbidden, 6, "Email not verified");
        }

        public static class Profile
        {
            public static ErrorResponse UNAUTHENTICATED = new ErrorResponse(HttpStatusCode.Forbidden, 5, "Unauthenticated");
            public static ErrorResponse RESET_PASSWORD_EMAIL_NOT_FOUND = new ErrorResponse(HttpStatusCode.NotFound, 8, "Email not found");
            public static ErrorResponse RESET_PASSWORD_CAPTCHA_INVALID = new ErrorResponse(HttpStatusCode.BadRequest, 9, "Recaptcha solution incorrect");
            public static ErrorResponse RESET_PASSWORD_INVALID_TOKEN = new ErrorResponse(HttpStatusCode.BadRequest, 10, "Invalid reset token");
        }


    }
}