import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PermitDirective, Pattern } from '../../directives/permit.directive';

@Component({
  selector: 'app-form-field-text-permit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PermitDirective,
  ],
  template: `
      <input 
        appPermit="{{pattern}}"
        type="{{type}}"
        id="{{name}}"
        name="{{name}}"
        [formControl]="$any(formGroup.get(name))"
        [attr.maxLength]="maxLength"
        [attr.placeholder]="placeholder"
        class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 {{class}}"
        [ngClass]="{'ring-red-500': !formGroup.get(name)?.valid && formGroup.get(name)?.touched} "
      >
      <!-- {{formGroup.get(name)?.valid}} -->
  `,
  
})
export class FormFieldTextPermitComponent {
  @Input() formGroup!: FormGroup<string | null>;
  @Input() name!: string;
  @Input() maxLength: number| null = null;
  @Input() type!: string;
  @Input() pattern!: Pattern | string;
  @Input() class?: string|undefined;
  @Input() placeholder?: string|undefined;
  
  ngOnInit() {

  }
}
