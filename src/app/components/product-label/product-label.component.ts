import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component,input } from '@angular/core';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-product-label',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    CustomCurrencyPipe,
  ],
  template: `
    <div>
      <p class="block text-sm font-medium leading-6 text-gray-900">
        <label class="block">Product: <span class="font-light text-gray-700">{{product()}}</span></label>
        <label class="block">Date: <span class="font-light text-gray-700">{{today | date: 'dd/MM/yyy hh:mm:ss'}}</span></label>
        <label class="block">Amount: <span class="font-light text-gray-700">{{price()| customCurrency: 'USD': 'code' :'1.2-2' }}</span></label>
      </p>
    </div>
  `,
  styleUrl: './product-label.component.css'
})
export class ProductLabelComponent {
  product = input.required<string>();
  price = input.required<number>();

  today = Date.now();

}
