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

        public User GetFiltered(string username=null, string password=null)
        {
            var q = _dbContext.Users.AsQueryable();
            if (!string.IsNullOrEmpty(username))
            {
                q=q.Where(p => p.Username == username);
            }
            if (!string.IsNullOrEmpty(password))
            {
                q = q.Where(p => p.Password == password);
            }

            return q.SingleOrDefault();
        }

        public IEnumerable<User> GetByUsernameOrEmail(string username, string email)
        {
            var q = _dbContext.Users.Where(p => p.Username == username || p.Email == email);
            return q.AsEnumerable();
        }
    }
}
