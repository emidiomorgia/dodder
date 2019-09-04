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

        public void CreateOwner(User user, int workSpaceId)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }
            User u = _usersRepository.GetFiltered(password: user.Password);
            if (u != null)
            {
                throw new UsernameExistsByUsernameException();
            }
            user.WorkSpaceId = workSpaceId;
            _usersRepository.Create(user);
            
        }

        public User UpdateOwner(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }
            IEnumerable<User> existing=_usersRepository.GetByUsernameOrEmail(user.Username, user.Email);
            if (existing.Count() > 0)
            {
                throw new NotUniqueUserException();        
            }
            if (string.IsNullOrEmpty(user.Password)){
                User existingById=_usersRepository.GetById(user.ID);
                if(existingById == null){
                    throw new UserNotFoundException();
                }
                user.Password = existingById.Password;
            }
            user=_usersRepository.Update(user);
            return user;
        }
    }
}
