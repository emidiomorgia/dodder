using Core.Domain.AggregateModels.UserAggregate;
using Core.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure.Repositories
{
    public class UserRepository
    {
        private readonly DodderContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public UserRepository(DodderContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public User Add(User user)
        {
            return _context.Users.Add(user).Entity;

        }

        public async Task<User> GetAsync(int orderId)
        {
            var user = await _context
                                .Users
                                .FirstOrDefaultAsync(o => o.Id == orderId);
            return user;
        }

        public void Update(User order)
        {
            _context.Entry(order).State = EntityState.Modified;
        }
    }
}
