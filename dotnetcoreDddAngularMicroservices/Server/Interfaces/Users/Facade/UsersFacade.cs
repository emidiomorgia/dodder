using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Application;
using Server.Domain.Model.Login;
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

        public void CreateUser(UserRegistrationDetailDTO user)
        {
            UserRegistrationDetailDTOAssembler asm = new UserRegistrationDetailDTOAssembler();
            User u =asm.FromDTO(user);
            _usersApplicationService.CreateUser(u);
            
        }

        public LoginResponseDTO FindUserAndGetToken(string username, string password)
        {
            LoginResponseDTOAssembler asm = new LoginResponseDTOAssembler();
            LoginInfo logininfo = _usersApplicationService.FindUserAndGetToken(username,password);
            LoginResponseDTO res = asm.ToDTO(logininfo);
            return res;
        }
    }
}
