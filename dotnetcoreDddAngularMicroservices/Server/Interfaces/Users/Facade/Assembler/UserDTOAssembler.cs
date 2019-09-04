using Server.Domain.Model.Users;
using Server.Interfaces.Users.Facade.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Assembler
{
    public class UserDTOAssembler
    {
        private IUsersRepository _usersRepository;

        public UserDTOAssembler(IUsersRepository usersRepository)
        {
            this._usersRepository=usersRepository;

        }
        public UserDTO ToDTO(User item){
            return new UserDTO(item.ID, item.Name, item.Username, item.Email);
        }

        public User FromDTO(UserDTO user)
        {
            if (user==null){
                throw new ArgumentNullException("user cannot be null");
            }
            User existingUser=_usersRepository.GetById(user.ID);
            if (existingUser == null){
                throw new UserNotFoundException();
            }
            User res = new User(user.ID, user.Username,null,user.Name,user.Email,existingUser.WorkSpaceId, existingUser.UserType);
            return res;
        }
    }
}
