import { Routes } from '@angular/router';
import { CargoOrdersComponent } from './features/cargo-orders/cargo-orders';
import { CargoDetailsComponent } from './features/cargo-details/cargo-details';

export const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: CargoOrdersComponent },
    { path: 'orders/:id', component: CargoDetailsComponent }
];
