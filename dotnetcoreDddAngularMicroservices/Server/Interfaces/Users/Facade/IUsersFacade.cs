using Server.Interfaces.Users.Facade.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade
{
    public interface IUsersFacade
    {
        UserRegistrationResponseDTO CreateUserAndGetToken(UserRegistrationDetailDTO user);
    }
}
