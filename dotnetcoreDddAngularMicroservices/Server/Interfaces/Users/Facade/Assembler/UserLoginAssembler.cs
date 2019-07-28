using Server.Domain.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Assembler
{
    public class UserLoginAssembler
    {
        public User FromDTO(string username, string password)
        {
            return new User(0, username, password);
        }
    }
}
