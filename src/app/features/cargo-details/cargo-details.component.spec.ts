import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDetailsComponent } from './cargo-details.component';

describe('CargoDetailsComponent', () => {
  let component: CargoDetailsComponent;
  let fixture: ComponentFixture<CargoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
