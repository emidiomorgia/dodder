using Core.API.Application.Models;
using System.Threading.Tasks;

namespace Core.API.Application.Queries
{
    public interface IAuthQueries
    {
        Task<UserLoginInfo> Login(string username, string password);
    }
}