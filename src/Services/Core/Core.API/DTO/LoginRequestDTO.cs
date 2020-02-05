namespace Core.API.Application.DTO
{
    public class LoginRequestDTO
    {
        public string Password { get;  set; }
        public string Username { get;  set; }

        public LoginRequestDTO(string username, string password)
        {
            Password = password;
            Username = username;
        }
    }
}