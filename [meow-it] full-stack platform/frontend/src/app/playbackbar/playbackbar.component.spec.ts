import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackbarComponent } from './playbackbar.component';

describe('PlaybackbarComponent', () => {
  let component: PlaybackbarComponent;
  let fixture: ComponentFixture<PlaybackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaybackbarComponent]
    });
    fixture = TestBed.createComponent(PlaybackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
