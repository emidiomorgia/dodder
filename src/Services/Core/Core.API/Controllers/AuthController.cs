using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public ActionResult<LoginResponseDTO> Login([FromBody] LoginRequestDTO loginRequestDTO) 
        {
            if (loginRequestDTO == null)
            {
                return BadRequest("loginRequestDTO must be not null");
            }
            if (string.IsNullOrEmpty(loginRequestDTO.Username))
            {
                return BadRequest("Username must be not null");
            }
            if (string.IsNullOrEmpty(loginRequestDTO.Password))
            {
                return BadRequest("Password must be not null");
            }

            try
            {
                if (loginRequestDTO.Username == "admin" && loginRequestDTO.Password == "password")
                {
                    var res = new LoginResponseDTO("TOKEN");
                    return Ok(res);
                }
                else
                {
                    throw new Exception("test error");
                    return NotFound("Cannot find a user with provided username and/or password.");
                }
            }
            catch (Exception ex)
            {
                //log exception
                throw new ApplicationException("An application error occurred. Retry later.");
            }
            
        }
    }
}