import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariComponent } from './formulari.component';

describe('FormulariComponent', () => {
  let component: FormulariComponent;
  let fixture: ComponentFixture<FormulariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
