using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Domain.SeedWork
{
    public class CoreApplicationException : Exception
    {
        public CoreApplicationException(string message) : 
            base(message) 
        {
        }
    }
}
