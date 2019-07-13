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

        public UsersApplicationService(IUsersDomainService usersDomainService, IAuthService authService)
        {
            _usersDomainService = usersDomainService;
            _authService = authService;
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
    }
}
