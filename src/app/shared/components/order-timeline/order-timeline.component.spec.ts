import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTimelineComponent } from './order-timeline.component';

describe('OrderTimelineComponent', () => {
  let component: OrderTimelineComponent;
  let fixture: ComponentFixture<OrderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTimelineComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
