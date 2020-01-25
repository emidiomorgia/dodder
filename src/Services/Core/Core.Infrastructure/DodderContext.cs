using Core.Domain.AggregateModels.UserAggregate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Infrastructure
{
    public class DodderContext : DbContext
    {
        public DodderContext(DbContextOptions<DodderContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        
    }
}
