using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.API.Application
{

    public class WeatherQueryHandler : IRequestHandler<WeatherQuery,string>
    {

        public Task<string> Handle(WeatherQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(request.Text + " OK");
        }
    }

}
