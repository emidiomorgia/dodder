using Core.API.Application.Models;
using Core.API.Application.Queries;
using Core.API.Exceptions;
using Core.Domain.AggregateModels.UserAggregate;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Core.UnitTests.Application
{
    public class AuthQueriesTest
    {
        [Fact]
        public async void Login__should_throw_exception_when_username_or_password_null() 
        {
            var repo = new Mock<IUserRepository>();
            var authQuery = new AuthQueries(repo.Object);
            User repoRes = null;

            repo.Setup(m => m.GetByUsernameAndPasswordAsync(null, null))
                .Returns(Task.FromResult(repoRes));

            await Assert.ThrowsAsync<CoreApplicationException>(() => authQuery.Login(null, null));
            
        }

        [Fact]
        public async void Login__should_return_userlogininfo_when_user_exists()
        {
            var repo = new Mock<IUserRepository>();
            var authQuery = new AuthQueries(repo.Object);
            User repoRes = new User();

            repo.Setup(m => m.GetByUsernameAndPasswordAsync("a", "b"))
                .Returns(Task.FromResult(repoRes));

            var res = await authQuery.Login("a", "b");

            Assert.NotNull(res);

        }

        [Fact]
        public async void Login__should_return_null_when_user_not_exists()
        {
            var repo = new Mock<IUserRepository>();
            var authQuery = new AuthQueries(repo.Object);
            User repoRes = null;

            repo.Setup(m => m.GetByUsernameAndPasswordAsync("a", "b"))
                .Returns(Task.FromResult(repoRes));

            var res = await authQuery.Login("a", "b");

            Assert.Null(res);

        }
    }
}
