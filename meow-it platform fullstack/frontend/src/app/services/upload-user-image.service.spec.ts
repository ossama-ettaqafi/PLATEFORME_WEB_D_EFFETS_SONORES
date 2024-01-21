import { TestBed } from '@angular/core/testing';

import { UploadUserImageService } from './upload-user-image.service';

describe('UploadUserImageService', () => {
  let service: UploadUserImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadUserImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
