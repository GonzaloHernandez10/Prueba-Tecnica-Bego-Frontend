import { Component, EventEmitter, Output } from '@angular/core';

/**
 * @description Componente de presentación (Dumb Component) que renderiza un input de búsqueda.
 * Delega la lógica de búsqueda emitiendo el valor introducido al componente padre.
 */
@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  /**
   * @description Emisor de eventos que notifica al padre cada vez que cambia el texto de búsqueda.
   */
  @Output() searchEvent = new EventEmitter<string>();

  /**
   * @description Maneja el evento de escritura en el input.
   * Extrae el valor del evento y lo emite a través de `searchEvent`.
   * @param {Event} event - Evento disparado al escribir.
   */
  onInputChange(event: Event): void {
    this.searchEvent.emit((event.target as HTMLInputElement).value);
  }
}
