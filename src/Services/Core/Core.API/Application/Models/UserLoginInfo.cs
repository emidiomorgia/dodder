using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.API.Application.Models
{
    public class UserLoginInfo
    {
        public string Token { get; set; }

        public UserLoginInfo(string token)
        {
            Token = token;
        }
    }
}
