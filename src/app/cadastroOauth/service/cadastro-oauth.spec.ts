import { CadastroOAuth } from './cadastro-oauth';

describe('Cadastro', () => {
  it('should create an instance', () => {
    expect(
      new CadastroOAuth(
        'externalAuthorizationId',
        'name',
        'email',
        'username',
        'birthDate',
        'category',
        'subcategory',
        'subcategoryID',
        'description',
        'userPicture',
        'backgroundPicture'
      )
    ).toBeTruthy();
  });
});
