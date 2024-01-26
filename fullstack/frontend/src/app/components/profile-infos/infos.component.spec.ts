import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfosComponent } from './infos.component';

describe('ProfileInfosComponent', () => {
  let component: ProfileInfosComponent;
  let fixture: ComponentFixture<ProfileInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInfosComponent]
    });
    fixture = TestBed.createComponent(ProfileInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
