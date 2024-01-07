import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrackPageComponent } from './upload-track-page.component';

describe('UploadTrackPageComponent', () => {
  let component: UploadTrackPageComponent;
  let fixture: ComponentFixture<UploadTrackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadTrackPageComponent]
    });
    fixture = TestBed.createComponent(UploadTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
