import { TestBed } from '@angular/core/testing';

import { AssinanteService } from './assinante.service';

describe('AssinanteService', () => {
  let service: AssinanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssinanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
