import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallScriptsComponent } from './install-scripts.component';

describe('InstallScriptsComponent', () => {
  let component: InstallScriptsComponent;
  let fixture: ComponentFixture<InstallScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallScriptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
