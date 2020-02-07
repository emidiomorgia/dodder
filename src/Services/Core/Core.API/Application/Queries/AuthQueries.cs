using Core.API.Application.Models;
using Core.API.Exceptions;
using Core.Domain.AggregateModels.UserAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.API.Application.Queries
{
    public class AuthQueries : IAuthQueries
    {
        private IUserRepository _userRepository;

        public AuthQueries(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        
        public async Task<UserLoginInfo> Login(string username, string password)
        {
            User user;

            if (string.IsNullOrEmpty(username))
            {
                throw new CoreApplicationException("Username must be not null");
            }
            if (string.IsNullOrEmpty(password))
            {
                throw new CoreApplicationException("Password must be not null");
            }
 
            user = await _userRepository.GetByUsernameAndPasswordAsync(username, password);

            if (user !=  null)
            {
                return await Task.FromResult(new UserLoginInfo("TOKEN"));
            }
            else
            {
                return null;
            }
        }
    }
}
