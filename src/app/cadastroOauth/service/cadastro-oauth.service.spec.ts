import { TestBed } from '@angular/core/testing';

import { CadastroOAuthService } from './cadastro-oauth.service';

describe('CadastroService', () => {
  let service: CadastroOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
