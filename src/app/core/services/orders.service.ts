import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Order, ApiResponse, OrderDetail } from '../../shared/models/order';

/**
 * @description Servicio core encargado de la comunicación con la API de órdenes.
 * Utiliza HttpClient para obtener el listado de órdenes y los detalles de las mismas.
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders';

  /**
   * @description Obtiene la lista de órdenes próximas (upcoming).
   * Parsea la respuesta del API y maneja errores de red o estructura inválida.
   * @returns Observable<Order[]> Un flujo con el arreglo de órdenes.
   */
  getOrdersUpcomming(): Observable<Order[]> {
    const url = `${this.apiUrl}/upcoming`;
    return this.http.get<ApiResponse<Order[]>>(url).pipe(
      map((response) => {
        if (response.status === 200 && response.result) {
          return response.result;
        } else {
          throw new Error('Error al obtener las órdenes');
        }
      }),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Error de conexión o servidor no disponible'));
      }),
    );
  }

  /**
   * @description Obtiene el detalle de la orden, incluyendo el status_list para el tracking.
   * @returns Observable<OrderDetail> Un flujo con el detalle de la orden.
   */
  getOrderDetail(): Observable<OrderDetail> {
    return this.http.get<ApiResponse<OrderDetail>>(this.apiUrl).pipe(
      map((response) => {
        if (response.status === 200 && response.result) {
          return response.result;
        } else {
          throw new Error('Error al obtener el detalle de la orden');
        }
      }),
      catchError((error) => {
        console.error('Error fetching order detail:', error);
        return throwError(() => new Error('Error de conexión o servidor no disponible'));
      }),
    );
  }
}
