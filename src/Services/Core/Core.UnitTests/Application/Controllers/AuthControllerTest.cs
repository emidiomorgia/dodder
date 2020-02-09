using Core.API.DTO;
using Core.API.Application.Models;
using Core.API.Application.Queries;
using Core.API.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;
using Core.API.Application.Commands;
using System.Threading;
using Core.Domain.SeedWork;

namespace Core.UnitTests.Application.Controllers
{
    public class AuthControllerTest
    {
        Mock<IMediator> m;
        Mock<IAuthQueries> q;
        AuthController c;

        public AuthControllerTest() 
        {
            m = new Mock<IMediator>();
            q = new Mock<IAuthQueries>();
            c = new AuthController(m.Object, q.Object);
        }

        [Fact]
        public async void Login__should_return_BadRequest_when_request_null()
        {
            var res=await c.Login(null);

            var objectRes=Assert.IsType<BadRequestObjectResult>(res.Result);
            Assert.Contains("loginRequestDTO", ((string)objectRes.Value));
        }

        [Fact]
        public async void Login__should_return_NotFound_when_authQueries_Login_returns_null()
        {

            var req = new LoginRequestDTO("","");
            UserLoginInfo res = null;

            q.Setup(m => m.Login("", "")).Returns(Task.FromResult(res));

            var controllerRes = await c.Login(req);

            var objectRes = Assert.IsType<NotFoundObjectResult>(controllerRes.Result);
            Assert.Contains("username", ((string)objectRes.Value));
            Assert.Contains("password", ((string)objectRes.Value));
        }

        [Fact]
        public async void Login__should_return_Ok_when_authQueries_Login_returns_object()
        {

            var req = new LoginRequestDTO("a", "b");
            UserLoginInfo res = new UserLoginInfo("token");
            LoginResponseDTO resDTO = null;
            q.Setup(m => m.Login("a", "b")).Returns(Task.FromResult(res));

            var controllerRes = await c.Login(req);

            var objectRes = Assert.IsType<OkObjectResult>(controllerRes.Result);
            resDTO = (LoginResponseDTO)(objectRes.Value);
            Assert.Equal("token",resDTO.Token);
            
        }

        [Fact]
        public async void Register__should_return_badrequest_when_registerRequestDTO_null() 
        {
            var res=await c.Register(null);

            var objectRes=Assert.IsType<BadRequestObjectResult>(res.Result);
            Assert.Contains("registerRequestDTO", ((string)objectRes.Value));
        }

        [Fact]
        public async void Register__should_return_response_with_correct_token_when_mediator_returns_not_null_value() 
        {   
            var dto = new RegisterRequestDTO("username","username","password");
            var cmd= new RegisterUserCommand("username","password","email");
            m.Setup(m => m.Send(It.IsAny<RegisterUserCommand>(),It.IsAny<CancellationToken>()))
            .ReturnsAsync(new UserLoginInfo("token"));

            var res=await c.Register(dto);

            var objectRes=Assert.IsType<OkObjectResult>(res.Result);
            Assert.True(((RegisterResponseDTO)objectRes.Value).Token == "token");
        }

        [Fact]
        public async void Register__should_return_ApplicationException_when_mediator_returns_null()
        {
            var dto = new RegisterRequestDTO("username", "username", "password");
            var cmd = new RegisterUserCommand("username", "password", "email");
            UserLoginInfo resLoginInfo = null;
            m.Setup(m => m.Send(It.IsAny<RegisterUserCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(resLoginInfo);

            await Assert.ThrowsAsync<ApplicationException>(() => c.Register(dto));
            
        }

        [Fact]
        public async void Register__should_return_BadFormat_when_mediator_throws_CoreApplicationException()
        {
            var dto = new RegisterRequestDTO("username", "username", "password");
            var cmd = new RegisterUserCommand("username", "password", "email");
            
            m.Setup(m => m.Send(It.IsAny<RegisterUserCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new CoreApplicationException("error"));

            var res = await c.Register(dto);
            var objectRes = Assert.IsType<BadRequestObjectResult>(res.Result);
            Assert.Contains("error", ((string)objectRes.Value));


        }
    }
}
