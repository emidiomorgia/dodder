
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{
    public interface IUsersRepository : IGenericRepository<User>
    {
        User GetFiltered(string username = null, string password = null);
        IEnumerable<User> GetByUsernameOrEmail(string username, string email);
    }
}
