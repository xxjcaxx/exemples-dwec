import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carret } from './carret';

describe('Carret', () => {
  let component: Carret;
  let fixture: ComponentFixture<Carret>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carret]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carret);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
