import { TestBed, inject } from '@angular/core/testing';

import { StateinService } from './statein.service';

describe('StateinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateinService]
    });
  });

  it('should be created', inject([StateinService], (service: StateinService) => {
    expect(service).toBeTruthy();
  }));
});
