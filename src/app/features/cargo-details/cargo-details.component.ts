import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-cargo-details',
  imports: [CommonModule],
  templateUrl: './cargo-details.component.html',
  styleUrl: './cargo-details.component.css',
})
export class CargoDetailsComponent {
  order!: Order;
  private router = inject(Router)

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    if (navigation?.extras.state?.['data']) {
      this.order = navigation.extras.state?.['data'];
    }
    else {
      this.router.navigate(['/orders']);
    }
  }

}
