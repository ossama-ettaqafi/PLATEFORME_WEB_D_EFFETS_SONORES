import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDetailEditComponent } from './track-detail-edit.component';

describe('TrackDetailEditComponent', () => {
  let component: TrackDetailEditComponent;
  let fixture: ComponentFixture<TrackDetailEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDetailEditComponent]
    });
    fixture = TestBed.createComponent(TrackDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
