import { TestBed, inject } from '@angular/core/testing';

import { ExcellService } from './excell.service';

describe('ExcellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcellService]
    });
  });

  it('should be created', inject([ExcellService], (service: ExcellService) => {
    expect(service).toBeTruthy();
  }));
});
