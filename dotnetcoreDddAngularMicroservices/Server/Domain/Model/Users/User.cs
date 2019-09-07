using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{
    public class User : IEntity
    {
        public int ID { get; set; }
        [MaxLength(50)]
        public string Username { get; set; }
        [MaxLength(50)]
        public string Password { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
 
        public UserType UserType { get; set; }

        public int WorkSpaceId { get; set; }
        [ForeignKey("WorkSpaceId")]
        public WorkSpace WorkSpace { get; set; }

        public User() { }

        public User(int id, string username, string password, string name, string email, int workSpaceId, UserType userType)
        {
            ID = id;
            Username = username;
            Password = password;
            Name = name;
            Email = email;
            WorkSpaceId = workSpaceId;
            UserType = userType;
        }
    }
}
