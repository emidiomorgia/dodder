export class LoginResponseDTO {
    public token: string;
    public name : string

    constructor(token : string, name: string){
        this.token = token;
        this.name = name;
    }
}
