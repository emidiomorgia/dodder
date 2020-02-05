using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Core.API.Application.DTO;
using Core.API.Application.Models;
using Core.API.Application.Queries;

using Core.API.DTO;
using Core.API.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IMediator _mediator;
        private IAuthQueries _authQueries;

        public AuthController(IMediator mediator, IAuthQueries authQueries) 
        {
            this._mediator = mediator;
            _authQueries = authQueries;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO loginRequestDTO) 
        {
            try
            {
                if (loginRequestDTO == null)
                {
                    return BadRequest("Parameter loginRequestDTO cannot be null");
                }

                UserLoginInfo userLoginInfo = await _authQueries.Login(loginRequestDTO.Username, loginRequestDTO.Password);
                if (userLoginInfo != null)
                {
                    LoginResponseDTO res = new LoginResponseDTO(userLoginInfo.Token);
                    return Ok(res);
                }
                else
                {
                    return NotFound("Cannot find a user with provided username and/or password.");
                }
            }
            catch (CoreApplicationException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                //log exception
                throw new ApplicationException("An application error occurred. Retry later.");
            }
        }
    }
}