import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDetails } from './cargo-details.component';

describe('CargoDetails', () => {
  let component: CargoDetails;
  let fixture: ComponentFixture<CargoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
