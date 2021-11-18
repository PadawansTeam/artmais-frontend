import { TestBed } from '@angular/core/testing';

import { PagamentoplanosService } from './pagamentoplanos.service';

describe('PagamentoplanosService', () => {
  let service: PagamentoplanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagamentoplanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
