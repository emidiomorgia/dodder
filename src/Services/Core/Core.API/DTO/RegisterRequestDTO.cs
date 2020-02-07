namespace Core.API.DTO
{
    public class RegisterRequestDTO
    {
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public RegisterRequestDTO(string username, string eMail, string password)
        {
            this.Username = username;
            this.EMail = eMail;
            this.Password = password;

        }

        public RegisterRequestDTO(){}

    }
}