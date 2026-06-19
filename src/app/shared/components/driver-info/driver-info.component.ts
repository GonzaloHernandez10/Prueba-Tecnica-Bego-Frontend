import { Component, Input, signal, computed } from '@angular/core';
import { TrackingStep } from '../../models/order';

/**
 * @description Componente de presentación (Dumb Component) que muestra el avatar
 * del conductor y el estado actual de seguimiento (tracking) de la orden.
 */
@Component({
  selector: 'app-driver-info',
  imports: [],
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.css',
})
export class DriverInfoComponent {
  /**
   * @description Signal interno que almacena la lista de pasos de tracking actual.
   */
  _trackingList = signal<TrackingStep[]>([]);

  /**
   * @description Setter decorado con @Input para interceptar la lista de tracking y actualizar el Signal interno.
   * @param value - Arreglo de pasos de tracking correspondiente a la etapa seleccionada.
   */
  @Input() set trackingList(value: TrackingStep[]) {
    this._trackingList.set(value);
  }

  /**
   * @description Getter para exponer de forma sencilla la lista actual a la vista HTML.
   */
  get list() {
    return this._trackingList();
  }

  /**
   * @description Signal computado que calcula dinámicamente cuántos pasos están activos.
   * Se utiliza para habilitar o deshabilitar el botón de "Track Order".
   */
  realStatus = computed(() => {
    return this._trackingList().filter((step) => step.active).length;
  });

  /**
   * @description Maneja el evento de click del botón "Track Order", imprimiendo en consola por ahora.
   */
  onTrackOrder(): void {
    console.log('Track Order');
  }
}
