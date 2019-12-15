using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Domain.Model.Users
{
    public class WorkSpace : IEntity
    {
        private const int V = 100;
        public int ID { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        [InverseProperty("WorkSpace")]
        public List<User> Users { get; set; }
        public WorkSpace() { }

        public WorkSpace(int id, string name)
        {
            ID = id;
            Name = name;
        }
    }
}
