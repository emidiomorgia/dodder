using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Domain.Model.Users;

namespace Server.Domain.Model.Login
{
    public class LoginInfo
    {
        public LoginInfo(User user, string token)
        {
            User = user;
            Token = token;
        }

        public User User { get; set; }
        public string Token { get; set; }


    }
}
