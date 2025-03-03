import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRankDetailsComponent } from './academic-rank-details.component';

describe('AcademicRankDetailsComponent', () => {
  let component: AcademicRankDetailsComponent;
  let fixture: ComponentFixture<AcademicRankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicRankDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicRankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
