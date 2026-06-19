import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order, Destination, OrderDetail } from '../../shared/models/order';
import { OrderTimelineComponent } from '../../shared/components/order-timeline/order-timeline.component';
import { DriverInfoComponent } from '../../shared/components/driver-info/driver-info.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { OrdersService } from '../../core/services/orders.service';

/**
 * @description Componente inteligente (Smart Component) que gestiona la vista detallada de una orden.
 * Coordina la visualización de la línea de tiempo, detalles del conductor y tracking list.
 */
@Component({
  selector: 'app-cargo-details',
  imports: [CommonModule, OrderTimelineComponent, DriverInfoComponent, TopBarComponent],
  templateUrl: './cargo-details.component.html',
  styleUrl: './cargo-details.component.css',
})
export class CargoDetailsComponent {
  /**
   * @description Información básica de la orden que fue pasada por el state del Router.
   */
  order!: Order;

  private router = inject(Router);
  private orderService = inject(OrdersService);

  /**
   * @description Signal que almacena la información detallada de la orden (OrderDetail).
   */
  orderDetail = signal<OrderDetail | null>(null);

  /**
   * @description Signal que almacena el destino activo actualmente visualizado (Pickup o Dropoff).
   */
  activeStage = signal<Destination | null>(null);

  /**
   * @description Signal que almacena el índice seleccionado en el timeline (0 para Pickup, 1 para Dropoff).
   */
  activeIndex = signal<number>(0);

  /**
   * @description Computed Signal que deriva dinámicamente la lista de estatus a mostrar
   * en base al orderDetail y al índice seleccionado.
   */
  currentTrackingList = computed(() => {
    const order = this.orderDetail();
    if (!order || !order.status_list) {
      return [];
    }
    return this.activeIndex() === 0 ? order.status_list.pickup : order.status_list.dropoff;
  });

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['order']) {
      this.order = navigation.extras.state?.['order'];
      this.activeStage.set(this.order.destinations[0]);
    } else {
      this.router.navigate(['/orders']);
    }
  }

  ngOnInit(): void {
    this.getDetailOrder();
  }

  /**
   * @description Consume el API para obtener los detalles extendidos de la orden.
   */
  getDetailOrder(): void {
    this.orderService.getOrderDetail().subscribe({
      next: (data: OrderDetail) => {
        this.orderDetail.set(data);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

  /**
   * @description Se ejecuta al recibir un evento del OrderTimeline. Cambia el destino activo.
   * @param index Índice del nuevo destino seleccionado.
   */
  onDestinationChange(index: number): void {
    this.activeIndex.set(index);
    this.activeStage.set(this.order.destinations[index]);
  }
}
