using Microsoft.EntityFrameworkCore;
using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Persistence
{
    public class DodderContext : DbContext
    {
        public DodderContext(DbContextOptions<DodderContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<WorkSpace> WorkSpaces { get; set; }
    }
}
