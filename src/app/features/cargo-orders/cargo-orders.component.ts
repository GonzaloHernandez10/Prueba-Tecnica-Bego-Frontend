import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { OrdersService } from '../../core/services/orders.service';
import { Order } from '../../shared/models/order';

/**
 * @description Componente principal (Smart Component) que gestiona la lista de órdenes.
 * Se encarga de consumir el servicio de órdenes, manejar los estados de carga/error,
 * y gestionar el filtro de búsqueda mediante Signals.
 */
@Component({
  selector: 'app-cargo-orders',
  imports: [CommonModule, OrderCardComponent, SearchBoxComponent, TopBarComponent],
  templateUrl: './cargo-orders.component.html',
  styleUrl: './cargo-orders.component.css',
})
export class CargoOrdersComponent implements OnInit {
  private orderService = inject(OrdersService);
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  /**
   * @description Almacena el texto o criterio de búsqueda introducido por el usuario.
   */
  searchTerm = signal<string>('');

  /**
   * @description Computed signal que retorna un arreglo filtrado de órdenes basado en `searchTerm`.
   * @returns {Order[]} Lista de órdenes filtradas por número de orden.
   */
  filteredOrders = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allOrders = this.orders();
    if (!term) {
      return allOrders;
    }
    return allOrders.filter((order) => order.order_number.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  /**
   * @description Actualiza el valor del término de búsqueda.
   * @param {string} text - El texto a buscar emitido por el componente SearchBox.
   */
  onSearch(text: string): void {
    this.searchTerm.set(text);
  }

  /**
   * @description Consume el servicio OrdersService para obtener la lista de órdenes (upcoming).
   * Maneja el estado de `isLoading` y captura errores de red para actualizar `errorMessage`.
   */
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
      },
    });
  }
}
