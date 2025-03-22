import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSettingsDialogComponent } from './save-settings-dialog.component';

describe('SaveSettingsDialogComponent', () => {
  let component: SaveSettingsDialogComponent;
  let fixture: ComponentFixture<SaveSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
