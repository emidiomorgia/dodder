using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Auth
{
    public interface IAuthService
    {
        string GetTokenForUser(User user);
    }
}
