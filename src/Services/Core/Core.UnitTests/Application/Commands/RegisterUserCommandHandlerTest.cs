using Core.API.Application.Commands;
using Core.API.Application.Models;
using Core.Domain.AggregateModels.UserAggregate;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Core.UnitTests.Application.Commands
{
    
    public class RegisterUserCommandHandlerTest
    {
        Mock<IUserService> usersService;
        RegisterUserCommandHandler handler;

        public RegisterUserCommandHandlerTest() 
        {
            usersService = new Mock<IUserService>();
            handler = new RegisterUserCommandHandler(usersService.Object);
        }

        [Fact]
        public async void Handle__Shoud_ThrowArgumentNullException_When_CommandParameterIsNull() 
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => handler.Handle(null, default(CancellationToken)));
        }

        [Fact]
        public void Handle__Should_CallUsersServiceCreateOwnerAsyncWithCorrectParams_When_CommandnotNull() 
        {
            RegisterUserCommand c = new RegisterUserCommand("username", "password", "email");
            User actualUser = null;
            usersService.Setup(m => m.CreateOwnerAsync(It.IsAny<User>()))
                 .ReturnsAsync((User passedUser) => {
                     actualUser = passedUser;
                     return new User(1, "username", "password", "email"); ; 
                 });

            handler.Handle(c, default(CancellationToken));
            
            usersService.Verify(m => m.CreateOwnerAsync(It.IsAny<User>()),Times.Once);
            Assert.True(c.Username == actualUser.Username 
                && c.Password == actualUser.Password 
                && c.EMail == actualUser.EMail);
        }

    }
}
