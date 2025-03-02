import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadContainerComponent } from './workload-container.component';

describe('WorkloadContainerComponent', () => {
  let component: WorkloadContainerComponent;
  let fixture: ComponentFixture<WorkloadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkloadContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkloadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
