import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/components/order-card/order-card';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cargo-orders',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './cargo-orders.html',
  styleUrl: './cargo-orders.css',
})
export class CargoOrdersComponent implements OnInit {
  private orderService = inject(OrdersService);
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.orderService.getOrdersUpcomming().subscribe({
      next: (data: Order[]) => {
        this.orders.set(data);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    })
  }

}
