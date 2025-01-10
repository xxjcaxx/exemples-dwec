import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariPokemonsComponent } from './formulari-pokemons.component';

describe('FormulariPokemonsComponent', () => {
  let component: FormulariPokemonsComponent;
  let fixture: ComponentFixture<FormulariPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariPokemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
