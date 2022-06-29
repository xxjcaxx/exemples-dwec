import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivorFormComponent } from './survivor-form.component';

describe('SurvivorFormComponent', () => {
  let component: SurvivorFormComponent;
  let fixture: ComponentFixture<SurvivorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvivorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurvivorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
