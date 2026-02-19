import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersKanbanItemComponent } from './characters-kanban-item.component';

describe('CharactersKanbanItemComponent', () => {
  let component: CharactersKanbanItemComponent;
  let fixture: ComponentFixture<CharactersKanbanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersKanbanItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersKanbanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
