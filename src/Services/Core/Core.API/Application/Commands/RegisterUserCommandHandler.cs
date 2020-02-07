using Core.API.Application.Models;
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
        public async Task<UserLoginInfo> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
        {

            return await Task.FromResult(new UserLoginInfo("token"));
        }
    }
}
