import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadListSettingsComponent } from './workload-list-settings.component';

describe('WorkloadListSettingsComponent', () => {
  let component: WorkloadListSettingsComponent;
  let fixture: ComponentFixture<WorkloadListSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkloadListSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkloadListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
