using Server.Domain.Model.Login;
using Server.Domain.Model.Users;
using Server.Interfaces.Users.Facade.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Assembler
{
    public class LoginResponseDTOAssembler
    {
        public LoginResponseDTO ToDTO(LoginInfo item)
        {
            
            if(item == null || item.Token == null || item.User == null){
                throw new ArgumentNullException("LoginInfo contains null elements");
            }

            if(string.IsNullOrEmpty(item.User.Name) && string.IsNullOrEmpty(item.User.Username)){
                throw new ArgumentNullException("LoginInfo user contains null name and username");
            }
            
            return new LoginResponseDTO(item.Token,item.User.Name ?? item.User.Username);
        }
    }
}
