import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivorItemComponent } from './survivor-item.component';

describe('SurvivorItemComponent', () => {
  let component: SurvivorItemComponent;
  let fixture: ComponentFixture<SurvivorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvivorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurvivorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
