using Core.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByUsernameAndPasswordAsync(string username, string password);
        Task<User> GetByUsernameAndPasswordAndEmailAsync(string username, string password, string email);
    }
}
