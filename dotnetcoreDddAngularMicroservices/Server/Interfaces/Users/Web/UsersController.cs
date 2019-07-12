using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Interfaces.Users.Facade.Dto;

namespace Server.Interfaces.Users.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        [Route("Register")]
        public ActionResult<UserRegistrationResponseDTO> Register([FromBody] UserRegistrationDetailDTO user)
        {
            if (user.Username == "error400"){
                return BadRequest("errore 400");
            }
            if (user.Username == "error500"){
                throw new Exception("Errore 500");
            }
            return new UserRegistrationResponseDTO() { Token = "ok" };
        }
    }
}
