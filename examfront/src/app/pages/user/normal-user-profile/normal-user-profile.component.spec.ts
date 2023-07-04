import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalUserProfileComponent } from './normal-user-profile.component';

describe('NormalUserProfileComponent', () => {
  let component: NormalUserProfileComponent;
  let fixture: ComponentFixture<NormalUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
