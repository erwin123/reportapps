import { TestBed, inject } from '@angular/core/testing';

import { ParambranchService } from './parambranch.service';

describe('ParambranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParambranchService]
    });
  });

  it('should be created', inject([ParambranchService], (service: ParambranchService) => {
    expect(service).toBeTruthy();
  }));
});
