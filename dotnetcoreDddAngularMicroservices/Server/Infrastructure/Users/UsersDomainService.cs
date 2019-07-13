using Server.Domain.Model.Users;
using Server.Domain.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Infrastructure.Users
{
    public class UsersDomainService : IUsersDomainService
    {
        private IUsersRepository _usersRepository;

        public UsersDomainService(IUsersRepository usersRepository) {
            this._usersRepository = usersRepository;
        }

        public void CreateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }
            User u = _usersRepository.GetByUsername(user.Username);
            if (u != null)
            {
                throw new UserExistsByUsernameException();
            }
            _usersRepository.Create(user);
            
        }
    }
}
