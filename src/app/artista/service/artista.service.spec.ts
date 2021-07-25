import { TestBed } from '@angular/core/testing';

import { ArtistaService } from './artista.service';

describe('ArtistaService', () => {
  let service: ArtistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
