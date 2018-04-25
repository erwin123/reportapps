import { TestBed, inject } from '@angular/core/testing';

import { CountappsService } from './countapps.service';

describe('CountappsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountappsService]
    });
  });

  it('should be created', inject([CountappsService], (service: CountappsService) => {
    expect(service).toBeTruthy();
  }));
});
