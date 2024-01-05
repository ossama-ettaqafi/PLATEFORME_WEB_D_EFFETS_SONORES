import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackPageComponent } from './edit-track-page.component';

describe('EditTrackPageComponent', () => {
  let component: EditTrackPageComponent;
  let fixture: ComponentFixture<EditTrackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrackPageComponent]
    });
    fixture = TestBed.createComponent(EditTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
