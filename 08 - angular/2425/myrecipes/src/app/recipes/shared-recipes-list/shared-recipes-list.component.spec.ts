import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRecipesListComponent } from './shared-recipes-list.component';

describe('SharedRecipesListComponent', () => {
  let component: SharedRecipesListComponent;
  let fixture: ComponentFixture<SharedRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRecipesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
