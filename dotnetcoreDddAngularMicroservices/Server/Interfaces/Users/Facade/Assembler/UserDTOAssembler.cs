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
        public UserDTO ToDTO(User item){
            return new UserDTO(item.ID, item.Name, item.Username, item.Password);
        }
    }
}
