using Core.API.Application.Models;
using MediatR;

namespace Core.API.Application.Commands
{
    public class RegisterUserCommand : IRequest<UserLoginInfo>
    {

        public string Username { get; set; }
        public string Password { get; set; }
        public string EMail { get; set; }

        public RegisterUserCommand(string username, string password, string eMail)
        {
            Username = username;
            Password = password;
            EMail = eMail;
        }
    }
}