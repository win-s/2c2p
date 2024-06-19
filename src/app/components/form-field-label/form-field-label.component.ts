import { Component,input } from '@angular/core';

@Component({
  selector: 'app-form-field-label',
  standalone: true,
  imports: [],
  template: `
    <label class="text-gray-900 font-medium block text-sm" for="{{forName()}}">
      <ng-content></ng-content>
    </label>
  `,
})
export class FormFieldLabelComponent {
  forName = input.required<string>();
}
