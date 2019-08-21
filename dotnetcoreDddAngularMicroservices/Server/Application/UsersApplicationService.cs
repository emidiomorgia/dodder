using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Domain.Model.Login;
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

        public void CreateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User");
            }
            
            _usersDomainService.CreateUser(user);
        }

        public LoginInfo FindUserAndGetToken(string username, string password)
        {
            
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentNullException("Username");
            }
            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException("Password");
            }
            string token;
            User user =_usersRepository.GetFiltered(username, password);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            token = _authService.GetTokenForUser(user);
            return new LoginInfo(user,token);
        }
    }
}
