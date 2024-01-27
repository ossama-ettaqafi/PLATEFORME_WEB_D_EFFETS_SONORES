import { TestBed } from '@angular/core/testing';

import { TrackUploadService } from './track-upload.service';

describe('TrackUploadService', () => {
  let service: TrackUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
