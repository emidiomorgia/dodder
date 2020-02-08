using Core.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public class User : Entity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string EMail { get; set; }

        public User() {}

        public User(int id, string username, string password, string email)
        {
            Id = id;
            Username = username;
            Password = password;
            EMail = email;
        }
    }
}
