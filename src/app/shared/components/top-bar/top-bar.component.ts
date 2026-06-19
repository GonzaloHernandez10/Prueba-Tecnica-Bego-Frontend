import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';

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
  private location = inject(Location);

  /**
   * @description Título dinámico que se muestra en el centro de la barra superior.
   */
  @Input() title: string = '';

  /**
   * @description Navega a la vista anterior en el historial del navegador.
   */
  goBack(): void {
    this.location.back();
  }
}
