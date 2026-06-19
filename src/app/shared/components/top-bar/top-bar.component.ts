import { Component, Input } from '@angular/core';

/**
 * @description Componente de presentación (Dumb Component) que renderiza la barra superior.
 * Contiene el botón de retroceso, el título de la vista actual y un icono.
 */
@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  /**
   * @description Título dinámico que se muestra en el centro de la barra superior.
   */
  @Input() title: string = '';
}
