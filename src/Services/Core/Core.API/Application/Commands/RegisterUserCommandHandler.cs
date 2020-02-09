using Core.API.Application.Models;
using Core.Domain.AggregateModels.UserAggregate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.API.Application.Commands
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, UserLoginInfo>
    {
        private IUserService _userService;

        public RegisterUserCommandHandler(IUserService userService) 
        {
            _userService = userService;
        }

        public async Task<UserLoginInfo> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
        {
            string token = "";
            if (command == null)
            {
                throw new ArgumentNullException("command cannot be null");
            }
            User ownerToAdd = new User(0, command.Username, command.Password, command.EMail);
            User insertedOwner = await _userService.CreateOwnerAsync(ownerToAdd);

            token = "token";
            return new UserLoginInfo(token);
        }
    }
}
