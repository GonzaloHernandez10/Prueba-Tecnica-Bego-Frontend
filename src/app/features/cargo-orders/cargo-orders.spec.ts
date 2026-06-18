import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoOrders } from './cargo-orders';

describe('CargoOrders', () => {
  let component: CargoOrders;
  let fixture: ComponentFixture<CargoOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
