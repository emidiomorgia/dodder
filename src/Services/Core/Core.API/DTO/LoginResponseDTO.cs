namespace Core.API.DTO
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }

        public LoginResponseDTO(string token)
        {
            this.Token = token;
        }
    }
}