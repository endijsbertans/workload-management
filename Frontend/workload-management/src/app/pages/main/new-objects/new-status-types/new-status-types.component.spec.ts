import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStatusTypesComponent } from './new-status-types.component';

describe('NewStatusTypesComponent', () => {
  let component: NewStatusTypesComponent;
  let fixture: ComponentFixture<NewStatusTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStatusTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStatusTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
