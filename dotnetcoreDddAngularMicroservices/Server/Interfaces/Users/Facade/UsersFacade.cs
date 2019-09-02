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
        private IUsersRepository _usersRepository;

        public UsersFacade(IUsersApplicationService usersApplicationService, IUsersRepository usersRepository) {
            this._usersApplicationService = usersApplicationService;
            this._usersRepository = usersRepository;
        }

        public void CreateUser(UserRegistrationDetailDTO user)
        {
            UserRegistrationDetailDTOAssembler asm = new UserRegistrationDetailDTOAssembler();
            User u =asm.FromDTO(user);
            _usersApplicationService.CreateUser(u);
            
        }

        public UserDTO GetUser(int userId)
        {
            UserDTOAssembler asm=new UserDTOAssembler();
            User u = _usersRepository.GetById(userId);
            if (u == null){
                throw new ArgumentNullException("userId cannot be null");
            }
            return asm.ToDTO(u);
        }

        public LoginResponseDTO GetUserAndToken(string username, string password)
        {
            LoginResponseDTOAssembler asm = new LoginResponseDTOAssembler();
            LoginInfo logininfo = _usersApplicationService.GetUserAndToken(username,password);
            LoginResponseDTO res = asm.ToDTO(logininfo);
            return res;
        }
    }
}
