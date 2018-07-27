import { TestBed, inject } from '@angular/core/testing';

import { DepeseService } from './depese.service';

describe('DepeseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepeseService]
    });
  });

  it('should be created', inject([DepeseService], (service: DepeseService) => {
    expect(service).toBeTruthy();
  }));
});
