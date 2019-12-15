using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Dto
{
    public class LoginResponseDTO
    {
        public LoginResponseDTO(string token, string name)
        {
            Token = token;
            Name = name;
        }

        public string Token { get; set; }
        public string Name { get; set; }
    }
}
