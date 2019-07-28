using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Application
{
    public interface IUsersApplicationService
    {
        string CreateUserAndGetToken(User user);
        string FindUserAndGetToken(User u);
    }
}
