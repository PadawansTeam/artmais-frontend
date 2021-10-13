import { TestBed } from '@angular/core/testing';

import { ConstrucaoService } from './construcao.service';

describe('ConstrucaoService', () => {
  let service: ConstrucaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstrucaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
