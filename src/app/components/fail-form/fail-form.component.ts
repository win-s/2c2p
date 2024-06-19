import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail-form',
  standalone: true,
  imports: [],
  template: `
    <p class="block text-sm font-medium leading-6 text-red-500">
      <label class="block">Error Message: <span class="font-light">{{message()}}</span></label>
    </p>
  `
})
export class FailFormComponent {
  router = inject(Router);

  message = signal<string>('');
  constructor() {
    this.router = inject(Router);
    const response= this.router.getCurrentNavigation()?.extras?.state?.['response'];
    this.message.set(response?.message ?? 'Something Went Wrong');
  }
}
