using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Interfaces.Users.Facade.Dto
{
    public class UserDTO
    {
            
        public int ID { get; set;}
        public string Name { get; set;}
        public string Username { get; set;}
        public string Email { get; set;}

        public UserDTO(int id, string name, string username, string email)
        {
            ID = id;
            Name = name;
            Username = username;
            Email = email;
        }
    }
}