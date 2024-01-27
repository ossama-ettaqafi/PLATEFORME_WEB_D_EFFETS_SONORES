import { TestBed } from '@angular/core/testing';

import { DeleteTrackService } from './delete-track.service';

describe('DeleteTrackService', () => {
  let service: DeleteTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
