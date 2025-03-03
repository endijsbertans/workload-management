import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSemesterComponent } from './new-semester.component';

describe('NewSemesterComponent', () => {
  let component: NewSemesterComponent;
  let fixture: ComponentFixture<NewSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSemesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
