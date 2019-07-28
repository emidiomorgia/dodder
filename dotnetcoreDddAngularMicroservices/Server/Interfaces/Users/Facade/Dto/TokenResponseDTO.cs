using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Dto
{
    public class TokenResponseDTO
    {
        public TokenResponseDTO(string token)
        {
            Token = token;
        }

        public string Token { get; set; }
    }
}
