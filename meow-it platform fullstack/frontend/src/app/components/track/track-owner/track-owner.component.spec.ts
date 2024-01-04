import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOwnerComponent } from './track-owner.component';

describe('TrackOwnerComponent', () => {
  let component: TrackOwnerComponent;
  let fixture: ComponentFixture<TrackOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackOwnerComponent]
    });
    fixture = TestBed.createComponent(TrackOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
