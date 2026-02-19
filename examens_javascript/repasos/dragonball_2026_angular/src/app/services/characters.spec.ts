import { TestBed } from '@angular/core/testing';

import { Characters } from './characters';

describe('Characters', () => {
  let service: Characters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Characters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
