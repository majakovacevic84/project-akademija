import { TestBed, inject } from '@angular/core/testing';

import { KvarService } from './kvar.service';

describe('KvarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KvarService]
    });
  });

  it('should be created', inject([KvarService], (service: KvarService) => {
    expect(service).toBeTruthy();
  }));
});
