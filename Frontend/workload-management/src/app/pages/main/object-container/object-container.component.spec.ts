import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectContainerComponent } from './object-container.component';

describe('ObjectContainerComponent', () => {
  let component: ObjectContainerComponent;
  let fixture: ComponentFixture<ObjectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
