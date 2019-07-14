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

        public UserNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UserNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}