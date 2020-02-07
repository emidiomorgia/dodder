namespace Core.API.DTO
{
    public class RegisterResponseDTO
    {
        public string Token { get; set; }

        public RegisterResponseDTO(string token)
        {
            this.Token = token;
        }
    }
}