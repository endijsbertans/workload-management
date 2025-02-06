import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeachingStaffComponent } from './new-teaching-staff.component';

describe('NewTeachingStaffComponent', () => {
  let component: NewTeachingStaffComponent;
  let fixture: ComponentFixture<NewTeachingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTeachingStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTeachingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
