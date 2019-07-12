using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Persistence
{
    public class UsersRepository : GenericRepository<User>
    {
        public UsersRepository(DodderContext dbContext)
            : base(dbContext)
        {
            
        }
    }
}
