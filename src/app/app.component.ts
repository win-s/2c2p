import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { ProductLabelComponent } from './components/product-label/product-label.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    CreditCardFormComponent,
    ProductLabelComponent,
  ],
  template: `
  <div class="mx-8 my-4 md:mx-16 md:my-8 lg:mx-32 lg:my-16">
    <div class="max-w-screen-md	lg:mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <app-product-label product="2c2p" [price]="1123.035"></app-product-label>
        <div><router-outlet /></div>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {
  title = '2c2p';
}
