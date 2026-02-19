import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersKanbanItem } from './characters-kanban-item';

describe('CharactersKanbanItem', () => {
  let component: CharactersKanbanItem;
  let fixture: ComponentFixture<CharactersKanbanItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersKanbanItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersKanbanItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
