using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.API.Exceptions
{
    public class CoreApplicationException : Exception
    {
        public CoreApplicationException(string message) : 
            base(message) 
        {
        }
    }
}
