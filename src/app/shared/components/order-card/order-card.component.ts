import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { OrderTimelineComponent } from '../order-timeline/order-timeline.component';

/**
 * @description Componente de presentación (Dumb Component) que muestra la información
 * resumida de una orden en formato de tarjeta. Recibe los datos mediante el decorador @Input.
 */
@Component({
  selector: 'app-order-card',
  imports: [CommonModule, OrderTimelineComponent],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  /**
   * @description Objeto Order que contiene los datos de la orden a mostrar.
   */
  @Input() order!: Order;
  private router = inject(Router)

  /**
   * @description Maneja el evento click del botón "Resume".
   * Navega a la vista de detalles y envía el objeto `order` a través del state
   * para evitar hacer una petición HTTP adicional.
   */
  onResumeClick(): void {
    this.router.navigate(['/details', this.order._id], {
      state: { order: this.order }
    })
  }
}
