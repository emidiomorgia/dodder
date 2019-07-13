using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{
    public class UserExistsByUsernameException : Exception
    {
        public UserExistsByUsernameException()
            : base("A User with the same username exists") {
        }
    }
}
