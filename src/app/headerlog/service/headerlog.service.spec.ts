import { TestBed } from '@angular/core/testing';

import { HeaderlogService } from './headerlog.service';

describe('HeaderlogService', () => {
  let service: HeaderlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
