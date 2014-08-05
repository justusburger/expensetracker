using System;
using System.Security.Cryptography;
using System.Text;

namespace ExpenseTracker.Logic.Helpers
{
    public interface ICryptoHelper
    {
        string GenerateSalt();
        string MD5(string clearText);
    }

    public class CryptoHelper : ICryptoHelper
    {
        public string GenerateSalt()
        {
            var inputString = DateTime.Now.Ticks + "-" + (new Random()).Next(0, 1000000000);
            return MD5(inputString);
        }

        public string MD5(string clearText)
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