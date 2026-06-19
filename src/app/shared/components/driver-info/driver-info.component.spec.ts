import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfo } from './driver-info.component';

describe('DriverInfo', () => {
  let component: DriverInfo;
  let fixture: ComponentFixture<DriverInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
