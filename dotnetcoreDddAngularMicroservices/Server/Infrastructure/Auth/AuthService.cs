using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Domain.Model.Users;

namespace Server.Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        public string GetTokenForUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }

            return "ID=" + user.ID.ToString();
        }
    }
}
