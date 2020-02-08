using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public interface IUserService
    {
        public Task<User> CreateOwnerAsync(User u);
    }
}
