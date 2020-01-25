using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
