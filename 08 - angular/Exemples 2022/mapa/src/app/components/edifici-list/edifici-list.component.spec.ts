import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiListComponent } from './edifici-list.component';

describe('EdificiListComponent', () => {
  let component: EdificiListComponent;
  let fixture: ComponentFixture<EdificiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
