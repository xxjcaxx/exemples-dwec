import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRecipesStepComponent } from './shared-recipes-step.component';

describe('SharedRecipesStepComponent', () => {
  let component: SharedRecipesStepComponent;
  let fixture: ComponentFixture<SharedRecipesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRecipesStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRecipesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
