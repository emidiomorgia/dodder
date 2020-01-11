namespace Core.API.Controllers
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }

        public LoginResponseDTO(string token)
        {
            Token = token;
        }
    }
}