using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{

    [Serializable]
    public class NotUniqueUserException : Exception
    {
        public NotUniqueUserException()
        : this("A User with the same username or password exists")
        {
        }

        public NotUniqueUserException(string message) : base(message)
        {
        }

    }
}
