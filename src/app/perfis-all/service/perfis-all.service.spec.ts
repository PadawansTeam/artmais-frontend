/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerfisAllService } from './perfis-all.service';

describe('Service: PerfisAll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfisAllService]
    });
  });

  it('should ...', inject([PerfisAllService], (service: PerfisAllService) => {
    expect(service).toBeTruthy();
  }));
});
