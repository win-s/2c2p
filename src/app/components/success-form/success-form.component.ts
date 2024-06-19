import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-form',
  standalone: true,
  imports: [],
  template: `
    <p class="block text-sm font-medium leading-6 text-gray-900">
      <label class="block">Your payment has been</label>
      <label class="block">successfully processed</label>
    </p>
    <p class="block text-sm font-medium leading-6 text-gray-900 mt-10">
      <label class="block">Invoice: <span class="font-light text-gray-700">{{invoice()}}</span></label>
    </p>
  `
})
export class SuccessFormComponent {
  router = inject(Router);

  invoice = signal<string>('');

  constructor() {
    this.router = inject(Router);
    const response= this.router.getCurrentNavigation()?.extras?.state?.['response'];
    this.invoice.set(response.invoiceNo);
  }
}
