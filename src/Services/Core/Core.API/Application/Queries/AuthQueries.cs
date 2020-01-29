using Core.API.Application.Models;
using Core.API.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.API.Application.Queries
{
    public class AuthQueries : IAuthQueries
    {
        public async Task<UserLoginInfo> Login(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new CoreApplicationException("Username must be not null");
            }
            if (string.IsNullOrEmpty(password))
            {
                throw new CoreApplicationException("Password must be not null");
            }

            if (username == "admin" && password == "password")
            {
                return await Task.FromResult(new UserLoginInfo("TOKEN"));
            }
            else
            {
                return null;
            }
        }
    }
}
