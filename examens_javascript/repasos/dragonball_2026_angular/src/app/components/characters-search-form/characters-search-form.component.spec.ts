import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersSearchFormComponent } from './characters-search-form.component';

describe('CharactersSearchFormComponent', () => {
  let component: CharactersSearchFormComponent;
  let fixture: ComponentFixture<CharactersSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
