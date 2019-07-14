using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Domain.Model.Users;
using Server.Domain.Service;
using Server.Infrastructure.Auth;

namespace Server.Application
{
    public class UsersApplicationService : IUsersApplicationService
    {
        private IUsersDomainService _usersDomainService;
        private IAuthService _authService;
        private IUsersRepository _usersRepository;

        public UsersApplicationService(IUsersDomainService usersDomainService, IAuthService authService, IUsersRepository usersRepository)
        {
            _usersDomainService = usersDomainService;
            _authService = authService;
            _usersRepository = usersRepository;
        }

        public string CreateUserAndGetToken(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }
            string token;
            _usersDomainService.CreateUser(user);
            token = _authService.GetTokenForUser(user);
            return token;
        }

        public string FindUserAndGetToken(User u)
        {
            if (u == null)
            {
                throw new ArgumentNullException("User");
            }
            if (string.IsNullOrEmpty(u.Username))
            {
                throw new ArgumentNullException("Username");
            }
            if (string.IsNullOrEmpty(u.Password))
            {
                throw new ArgumentNullException("Password");
            }
            string token;
            User user =_usersRepository.GetFiltered(u.Username, u.Password);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            token = _authService.GetTokenForUser(user);
            return token;
        }
    }
}
