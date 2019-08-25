using Server.Domain.Model.Login;
using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Application
{
    public interface IUsersApplicationService
    {
        void CreateUser(User user);
        LoginInfo GetUserAndToken(string username, string password);
    }
}
