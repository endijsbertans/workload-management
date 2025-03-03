import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAcademicRankDetailsComponent } from './new-academic-rank-details.component';

describe('AcademicRankDetailsComponent', () => {
  let component: NewAcademicRankDetailsComponent;
  let fixture: ComponentFixture<NewAcademicRankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAcademicRankDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAcademicRankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
