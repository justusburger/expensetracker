using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ExpenseTracker.API.Helpers
{
    public static class CryptoHelper
    {
        public static string GenerateSalt()
        {
            var inputString = DateTime.Now.Ticks + "-" + (new Random()).Next(0, 1000000000);
            return MD5(inputString);
        }

        public static string MD5(string clearText)
        {
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(clearText);
            byte[] hash = md5.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
                sb.Append(hash[i].ToString("X2"));
            return sb.ToString();
        }
    }
}