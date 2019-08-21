using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{
    public class User : IEntity
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public User() { }

        public User(int id, string username, string password, string name, string email)
        {
            ID = id;
            Username = username;
            Password = password;
            Name = name;
            Email = email;
        }
    }
}
