import { TestBed } from '@angular/core/testing';

import { HeaderusercomumService } from './headerusercomum.service';

describe('HeaderusercomumService', () => {
  let service: HeaderusercomumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderusercomumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
