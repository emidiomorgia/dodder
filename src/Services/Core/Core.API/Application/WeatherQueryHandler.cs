using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.API.Application
{

    public class WeatherQueryHandler : INotificationHandler<WeatherQuery>
    {
        public Task Handle(WeatherQuery notification, CancellationToken cancellationToken)
        {
           
            return Task.CompletedTask;
        }
    }

}
