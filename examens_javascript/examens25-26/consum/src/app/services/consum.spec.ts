import { TestBed } from '@angular/core/testing';

import { Consum } from './consum';

describe('Consum', () => {
  let service: Consum;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Consum);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
