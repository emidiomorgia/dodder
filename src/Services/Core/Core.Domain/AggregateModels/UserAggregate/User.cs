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


    }
}
