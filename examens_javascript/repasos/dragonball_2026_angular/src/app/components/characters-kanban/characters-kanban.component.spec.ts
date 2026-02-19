import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersKanbanComponent } from './characters-kanban.component';

describe('CharactersKanbanComponent', () => {
  let component: CharactersKanbanComponent;
  let fixture: ComponentFixture<CharactersKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
