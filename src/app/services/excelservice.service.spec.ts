import { TestBed, inject } from '@angular/core/testing';

import { ExcelserviceService } from './excelservice.service';

describe('ExcelserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelserviceService]
    });
  });

  it('should be created', inject([ExcelserviceService], (service: ExcelserviceService) => {
    expect(service).toBeTruthy();
  }));
});
