import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <p class="text-red-500 text-xs italic mt-2">
      <ng-content></ng-content>
    </p>
  `,
})
export class ErrorComponent {

}
