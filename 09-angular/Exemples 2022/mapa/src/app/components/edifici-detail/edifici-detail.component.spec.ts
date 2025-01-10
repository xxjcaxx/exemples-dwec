import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiDetailComponent } from './edifici-detail.component';

describe('EdificiDetailComponent', () => {
  let component: EdificiDetailComponent;
  let fixture: ComponentFixture<EdificiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
