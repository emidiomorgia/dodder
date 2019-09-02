using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Domain.Model.Users;
using Server.Interfaces.Users.Facade;
using Server.Interfaces.Users.Facade.Dto;

namespace Server.Interfaces.Users.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersFacade _usersFacade;

        public UsersController(IUsersFacade usersFacade)
        {
            this._usersFacade = usersFacade;
        }

        [HttpPost]
        [Route("Register")]
        public ActionResult Register([FromBody] UserRegistrationDetailDTO user)
        {
            if (user == null){
                return BadRequest("User parameter cannot be null");
            }
            try
            {
                _usersFacade.CreateUser(user);
                return Ok();
            }
            catch (UserExistsByUsernameException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("Login")]
        public ActionResult<LoginResponseDTO> Login(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username parameter cannot be null");
            }
            if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Password parameter cannot be null");
            }

            try
            {
                return _usersFacade.GetUserAndToken(username, password);
            }
            catch (UserNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("Values")]
        public ActionResult<LoginResponseDTO> Values()
        {
            return new LoginResponseDTO("abc", "bdc");
        }

        [HttpGet]
        [Authorize]
        [Route("EditProfile")]
        public ActionResult<UserDTO> GetEditProfile()
        {
            System.Security.Claims.Claim claim=HttpContext.User.Claims.Where(p => p.Type == System.Security.Claims.ClaimTypes.Sid).SingleOrDefault();
            if(claim == null)
            {
                return Unauthorized("Security error, try to login again");
            }
            int userId = int.Parse(claim.Value);
            
            return _usersFacade.GetUser(userId);
        }

        [HttpPost]
        [Authorize]
        [Route("EditProfile")]
        public ActionResult PostEditProfile(UserDTO user)
        {
            System.Security.Claims.Claim claim=HttpContext.User.Claims.Where(p => p.Type == System.Security.Claims.ClaimTypes.Sid).SingleOrDefault();
            if(claim == null )
            {
                return Unauthorized("Security error, try to login again");
            }
            int userId = int.Parse(claim.Value);
            if(user.ID != userId)
            {
                return Unauthorized("Security error, try to login again");
            }
            
            return Ok();
        }
    }
}
