import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersSearchForm } from './characters-search-form';

describe('CharactersSearchForm', () => {
  let component: CharactersSearchForm;
  let fixture: ComponentFixture<CharactersSearchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersSearchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersSearchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
