using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public ActionResult<UserRegistrationResponseDTO> Register([FromBody] UserRegistrationDetailDTO user)
        {
            if (user == null){
                return BadRequest("User parameter cannot be null");
            }
            try
            {
                return _usersFacade.CreateUserAndGetToken(user);
            }
            catch (UserExistsByUsernameException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
