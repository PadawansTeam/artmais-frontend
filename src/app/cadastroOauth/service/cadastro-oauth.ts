export class CadastroOAuth {
  constructor(
    public externalAuthorizationId: string,
    public name: string,
    public email: string,
    public username: string,
    public birthDate: Date,
    public category: string,
    public subcategory: string,
    public subcategoryID: 0,
    public description: string,
    public userPicture: string,
    public backgroundPicture: string
  ) {}
}
