import { Component } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col md:flex-row">
      <div class="basis-1/3">
        <ng-content select="[field-label]"></ng-content>
      </div>
      <div class="flex-1 mt-2 md:mt-0">
        <ng-content select="[field-input]"></ng-content>
        <ng-content select="[field-error]"></ng-content>
        <ng-content select="[submit]"></ng-content>
      </div>
    </div>
  `,
})
export class FormFieldComponent {

}
