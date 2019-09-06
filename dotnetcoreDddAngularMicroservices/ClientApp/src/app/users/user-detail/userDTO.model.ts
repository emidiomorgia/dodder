export class UserDTO {
    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public password: string;


    constructor(id: number, name: string, username: string, password : string, email: string){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password =password;
    }
}
