using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Application;
using Server.Domain.Model.Users;
using Server.Domain.Service;
using Server.Interfaces.Users.Facade.Assembler;
using Server.Interfaces.Users.Facade.Dto;

namespace Server.Interfaces.Users.Facade
{
    public class UsersFacade : IUsersFacade
    {
        private IUsersApplicationService _usersApplicationService;

        public UsersFacade(IUsersApplicationService usersApplicationService) {
            this._usersApplicationService = usersApplicationService;
        }

        public TokenResponseDTO CreateUserAndGetToken(UserRegistrationDetailDTO user)
        {
            UserRegistrationDetailDTOAssembler asm = new UserRegistrationDetailDTOAssembler();
            User u =asm.FromDTO(user);
            string token = _usersApplicationService.CreateUserAndGetToken(u);
            TokenResponseDTO res = new TokenResponseDTO(token);
            return res;
        }

        public TokenResponseDTO FindUserAndGetToken(string username, string password)
        {
            UserLoginAssembler asm = new UserLoginAssembler();
            User u = asm.FromDTO(username, password);
            string token = _usersApplicationService.FindUserAndGetToken(u);
            TokenResponseDTO res = new TokenResponseDTO(token);
            return res;
        }
    }
}
