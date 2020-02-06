export class RegisterRequest {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    constructor(username: string, email: string, password: string, repeatPassword: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
    }
}
