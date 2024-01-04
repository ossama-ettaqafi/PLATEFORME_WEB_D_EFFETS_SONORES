import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedMeComponent } from './feed-me.component';

describe('FeedMeComponent', () => {
  let component: FeedMeComponent;
  let fixture: ComponentFixture<FeedMeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedMeComponent]
    });
    fixture = TestBed.createComponent(FeedMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
