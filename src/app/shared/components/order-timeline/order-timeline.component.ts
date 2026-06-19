import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Destination } from '../../models/order';
import { ExtractCityPipe } from '../../pipes/extract-city.pipe';

/**
 * @description Componente de presentación (Dumb Component) que renderiza la línea de tiempo
 * visual de recolección y entrega. Se extrajo para poder reutilizarlo tanto en la tarjeta
 * (OrderCard) como en la vista de detalles (CargoDetails).
 */
@Component({
  selector: 'app-order-timeline',
  imports: [CommonModule, ExtractCityPipe],
  templateUrl: './order-timeline.component.html',
  styleUrl: './order-timeline.component.css',
})
export class OrderTimelineComponent {
  /**
   * @description Arreglo de destinos (Pickup, Dropoff, etc.) que dicta los puntos del timeline.
   */
  @Input() destinations!: Destination[];
  @Output() stageSelected = new EventEmitter<number>();

  activeIndex = signal<number>(0);

  /**
   * @description Maneja la selección de una etapa de la timeline.
   * @param index Índice de la etapa seleccionada.
   */
  onSelected(index: number): void {
    this.activeIndex.set(index);
    this.stageSelected.emit(index);
  }
}
