import { Component, Input, inject, OnInit, OnDestroy, signal } from '@angular/core';
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
export class OrderCardComponent implements OnInit, OnDestroy {
  /**
   * @description Objeto Order que contiene los datos de la orden a mostrar.
   */
  @Input() order!: Order;
  private router = inject(Router);

  /**
   * @description Signal que almacena la cadena de texto del tiempo restante o "Navegar".
   */
  timeRemaining = signal<string>('');

  /**
   * @description Signal booleano que indica si la fecha de inicio ya se alcanzó y la orden es navegable.
   */
  isNavigable = signal<boolean>(false);

  /**
   * @description Identificador del intervalo para la cuenta regresiva.
   */
  private intervalId: any;

  ngOnInit() {
    this.calculateTime();
    this.intervalId = setInterval(() => this.calculateTime(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * @description Calcula la diferencia de tiempo entre la fecha de inicio de la orden y la hora actual.
   * Actualiza los Signals de estado dependiendo si ya es tiempo de recolección o aún falta.
   */
  calculateTime() {
    if (!this.order || !this.order.destinations || this.order.destinations.length === 0) return;

    const startDate = new Date(this.order.destinations[0].start_date).getTime();
    const now = new Date().getTime();
    const diff = startDate - now;

    if (diff <= 0) {
      this.isNavigable.set(true);
      this.timeRemaining.set('Navegar');
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    } else {
      this.isNavigable.set(false);
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const hh = hours.toString().padStart(2, '0');
      const mm = minutes.toString().padStart(2, '0');
      const ss = seconds.toString().padStart(2, '0');

      this.timeRemaining.set(`Start pickup in ${hh}:${mm}:${ss}`);
    }
  }

  /**
   * @description Maneja el evento de click sobre el botón "Navegar".
   */
  onNavigateClick(): void {
    console.log('Navegar');
  }

  /**
   * @description Maneja el evento click del botón "Resume".
   * Navega a la vista de detalles y envía el objeto `order` a través del state
   * para evitar hacer una petición HTTP adicional.
   */
  onResumeClick(): void {
    this.router.navigate(['/details', this.order._id], {
      state: { order: this.order },
    });
  }
}
