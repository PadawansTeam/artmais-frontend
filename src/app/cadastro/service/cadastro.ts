export class Cadastro {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public username: string,
    public birthDate: Date,
    public role: string,
    public category: string,
    public subcategory: string,
    public subcategoryID: 0,
    public description: string,
    public userPicture: string,
    public backgroundPicture: string
  ) {}
}
