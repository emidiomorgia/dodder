using Core.Domain.AggregateModels.UserAggregate;
using Core.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(DodderContext context) : base(context)
        {
        }

        public Task<User> GetByUsernameAndPasswordAndEmailAsync(string username, string password, string email)
        {
            var q = _context.Users
                .Where(p => p.Username == username && p.Password == password && p.EMail == email);

            return q.SingleOrDefaultAsync();
        }

        public Task<User> GetByUsernameAndPasswordAsync(string username, string password)
        {
            var q = _context.Users
                .Where(p => p.Username == username && p.Password == password);
            
            return q.SingleOrDefaultAsync();
        }
    }
}
