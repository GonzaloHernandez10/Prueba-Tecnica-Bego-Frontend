import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoOrdersComponent } from './cargo-orders.component';

describe('CargoOrdersComponent', () => {
  let component: CargoOrdersComponent;
  let fixture: ComponentFixture<CargoOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoOrdersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
