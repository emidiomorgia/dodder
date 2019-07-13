using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Persistence
{
    public class UsersRepository : GenericRepository<User>, IUsersRepository
    {
        public UsersRepository(DodderContext dbContext)
            : base(dbContext)
        {
            
        }

        public User GetByUsername(string username)
        {
            var q = _dbContext.Users.Where(p => p.Username == username);
            return q.SingleOrDefault();
        }
    }
}
