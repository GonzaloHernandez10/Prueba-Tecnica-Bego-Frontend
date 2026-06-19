import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
    },
    {
        path: 'orders',
        loadComponent: () => import('./features/cargo-orders/cargo-orders.component').then(m => m.CargoOrdersComponent)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./features/cargo-details/cargo-details.component').then(m => m.CargoDetailsComponent)
    }
];
