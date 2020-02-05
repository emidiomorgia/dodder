using Core.API.Application.DTO;
using Core.API.Application.Models;
using Core.API.Application.Queries;
using Core.API.Controllers;
using Core.API.DTO;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Core.UnitTests
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
    }
}
