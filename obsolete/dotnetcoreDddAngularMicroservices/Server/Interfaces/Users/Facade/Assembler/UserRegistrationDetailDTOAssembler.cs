using Server.Domain.Model.Users;
using Server.Interfaces.Users.Facade.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Assembler
{
    public class UserRegistrationDetailDTOAssembler
    {
        public User FromDTO(UserRegistrationDetailDTO item)
        {
            return new User(item.ID, item.Username, item.Password,null,null,0,0);
        }
    }
}
