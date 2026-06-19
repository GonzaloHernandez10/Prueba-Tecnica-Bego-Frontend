import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Order, ApiResponse } from '../../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming';

  /**
   * Obtiene la lista de ordenes
   * @returns Observable<Order[]>
   */
  getOrdersUpcomming(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl).pipe(
      map(response => {
        if(response.status === 200 && response.result){ 
          return response.result;
        }
        else{ // Error en la peticion o datos invalidos
          throw new Error('Error al obtener las órdenes');
        }
      }),
      catchError(error => { // Error de conexion o del servidor
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Error de conexión o servidor no disponible'));
      })
    );
  }
}
