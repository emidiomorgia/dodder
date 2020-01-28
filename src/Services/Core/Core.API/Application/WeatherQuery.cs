using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.API.Application
{
    public class WeatherQuery : IRequest<string>
    {
        public string Text { get; set; }

        public WeatherQuery(string text)
        {
            Text = text;
        }
    }
}
