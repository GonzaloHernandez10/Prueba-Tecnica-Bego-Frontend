import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';
import { ExtractCityPipe } from '../../pipes/extract-city.pipe';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, ExtractCityPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCardComponent {
  @Input() order!: Order;

  onResumeClick(): void {
    console.log('Resume');
  }

}
