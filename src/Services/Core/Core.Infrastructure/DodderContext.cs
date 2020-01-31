using Core.Domain.AggregateModels.UserAggregate;
using Core.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Infrastructure
{
    public class DodderContext : DbContext, IUnitOfWork
    {
        public DodderContext(DbContextOptions<DodderContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
        {
            var result = await base.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
