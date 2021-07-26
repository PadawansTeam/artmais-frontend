import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  it('should create an instance', () => {
    expect(
      new Cadastro("name", "surname", "socialName", "email", "password", "description", "userPicture", "backgroundPicture")
    ).toBeTruthy();
  });
});
