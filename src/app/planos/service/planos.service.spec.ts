import { TestBed } from '@angular/core/testing';

import { PlanosService } from './planos.service';

describe('PlanosService', () => {
  let service: PlanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
