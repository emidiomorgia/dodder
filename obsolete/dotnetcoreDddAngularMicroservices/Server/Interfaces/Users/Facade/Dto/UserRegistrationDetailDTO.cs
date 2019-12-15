using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Dto
{
    public class UserRegistrationDetailDTO
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
