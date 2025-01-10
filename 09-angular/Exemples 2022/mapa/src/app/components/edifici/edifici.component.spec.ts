import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiComponent } from './edifici.component';

describe('EdificiComponent', () => {
  let component: EdificiComponent;
  let fixture: ComponentFixture<EdificiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
