using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository) 
        {
            this._userRepository = userRepository;
        }
        public async Task<User> CreateOwnerAsync(User u)
        {
            User res = null;
            User existingUser = await _userRepository.GetByUsernameAndPasswordAndEmailAsync(u.Username, u.Password, u.EMail);
            if (existingUser != null)
            {
                throw new OwnerExistsException();
            }
            res = _userRepository.Add(u);
            await _userRepository.UnitOfWork.SaveChangesAsync();
            return res;
        }
    }
}
