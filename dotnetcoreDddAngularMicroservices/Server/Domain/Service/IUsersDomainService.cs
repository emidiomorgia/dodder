using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Service
{
    public interface IUsersDomainService
    {
        void CreateUser(User user, int workSpaceId);
    }
}
