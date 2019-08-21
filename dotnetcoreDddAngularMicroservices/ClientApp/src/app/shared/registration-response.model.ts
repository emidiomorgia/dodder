export class TokenResponseDTO {
    public token: string;


    constructor(token : string, username: string){
        this.token = token;
    }
}
