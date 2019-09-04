using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{

    [Serializable]
    public class UsernameExistsByUsernameException : Exception
    {
        public UsernameExistsByUsernameException()
        : this("A User with the same username exists")
        {
        }

        public UsernameExistsByUsernameException(string message) : base(message)
        {
        }
    }
}