import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAcademicRankComponent } from './new-academic-rank.component';

describe('NewAcademicRankComponent', () => {
  let component: NewAcademicRankComponent;
  let fixture: ComponentFixture<NewAcademicRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAcademicRankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAcademicRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
