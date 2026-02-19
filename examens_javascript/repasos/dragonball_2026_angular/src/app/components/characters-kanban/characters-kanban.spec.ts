import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersKanban } from './characters-kanban';

describe('CharactersKanban', () => {
  let component: CharactersKanban;
  let fixture: ComponentFixture<CharactersKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersKanban]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
