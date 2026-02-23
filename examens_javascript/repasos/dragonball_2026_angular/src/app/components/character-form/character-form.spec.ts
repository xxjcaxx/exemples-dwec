import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterForm } from './character-form';

describe('CharacterForm', () => {
  let component: CharacterForm;
  let fixture: ComponentFixture<CharacterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
