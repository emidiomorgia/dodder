using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Persistence
{
    public class WorkSpacesRepository : GenericRepository<WorkSpace>, IWorkSpacesRepository
    {
        public WorkSpacesRepository(DodderContext dbContext)
            : base(dbContext)
        {
            
        }
    }
}
