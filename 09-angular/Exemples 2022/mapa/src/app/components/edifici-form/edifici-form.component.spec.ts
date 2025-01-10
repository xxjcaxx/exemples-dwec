import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiFormComponent } from './edifici-form.component';

describe('EdificiFormComponent', () => {
  let component: EdificiFormComponent;
  let fixture: ComponentFixture<EdificiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
