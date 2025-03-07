import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilterDialogComponent } from './column-filter-dialog.component';

describe('ColumnFilterDialogComponent', () => {
  let component: ColumnFilterDialogComponent;
  let fixture: ComponentFixture<ColumnFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnFilterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
