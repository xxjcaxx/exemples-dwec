import { TestBed } from '@angular/core/testing';

import { LineServiceService } from './line-service.service';

describe('LineServiceService', () => {
  let service: LineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
