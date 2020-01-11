export class LoginResponseDTO {
  public token: string;

  constructor(token : string) {
    this.token = token;
  }
}
