using Core.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domain.AggregateModels.UserAggregate
{
    public class OwnerExistsException : CoreApplicationException
    {
        public OwnerExistsException() 
            : base("A user with the same credentials alredy exists")
        {
        }
    }
}
