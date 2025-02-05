import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkloadComponent } from './new-workload.component';

describe('NewWorkloadComponent', () => {
  let component: NewWorkloadComponent;
  let fixture: ComponentFixture<NewWorkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWorkloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
