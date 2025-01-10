import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRecipesComponent } from './shared-recipes.component';

describe('SharedRecipesComponent', () => {
  let component: SharedRecipesComponent;
  let fixture: ComponentFixture<SharedRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
