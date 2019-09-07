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
        private IUsersDomainService _usersDomainService;
        private IUsersRepository _usersRepository;

        public UsersFacade(IUsersApplicationService usersApplicationService, IUsersDomainService usersDomainService, 
            IUsersRepository usersRepository) {
            this._usersApplicationService = usersApplicationService;
            this._usersDomainService = usersDomainService;
            this._usersRepository = usersRepository;
        }

        public void CreateOwner(UserRegistrationDetailDTO user)
        {
            UserRegistrationDetailDTOAssembler asm = new UserRegistrationDetailDTOAssembler();
            User u =asm.FromDTO(user);
            _usersApplicationService.CreateOwner(u);
            
        }

        public void UpdateOwner(UserDTO user)
        {
            UserDTOAssembler asm = new UserDTOAssembler(_usersRepository);
            User u =asm.FromDTO(user);
            _usersDomainService.UpdateOwner(u);
        }

        public UserDTO GetUser(int userId)
        {
            UserDTOAssembler asm=new UserDTOAssembler(_usersRepository);
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
