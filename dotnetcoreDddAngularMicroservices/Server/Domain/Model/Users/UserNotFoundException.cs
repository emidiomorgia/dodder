using System;
using System.Runtime.Serialization;

namespace Server.Domain.Model.Users
{
    [Serializable]
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
        :this("Cannot find a user with provided username and/or password")
        {
        }

        public UserNotFoundException(string message) : base(message)
        {
        }

    }
}