using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{

    [Serializable]
    public class UserExistsByUsernameException : Exception
    {
        public UserExistsByUsernameException()
        : this("A User with the same username exists")
        {
        }

        public UserExistsByUsernameException(string message) : base(message)
        {
        }
    }
}