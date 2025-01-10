import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTableRowComponent } from './recipe-table-row.component';

describe('RecipeTableRowComponent', () => {
  let component: RecipeTableRowComponent;
  let fixture: ComponentFixture<RecipeTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
