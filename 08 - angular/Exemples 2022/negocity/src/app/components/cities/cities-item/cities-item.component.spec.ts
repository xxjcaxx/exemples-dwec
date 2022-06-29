import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesItemComponent } from './cities-item.component';

describe('CitiesItemComponent', () => {
  let component: CitiesItemComponent;
  let fixture: ComponentFixture<CitiesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
