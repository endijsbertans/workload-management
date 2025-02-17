import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInputDataComponent } from './preview-input-data.component';

describe('PreviewInputDataComponent', () => {
  let component: PreviewInputDataComponent;
  let fixture: ComponentFixture<PreviewInputDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewInputDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewInputDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
