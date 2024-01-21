import { TestBed } from '@angular/core/testing';

import { UploadTrackImageService } from './upload-track-image.service';

describe('UploadTrackImageService', () => {
  let service: UploadTrackImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadTrackImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
