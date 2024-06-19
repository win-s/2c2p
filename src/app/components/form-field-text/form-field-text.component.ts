import { CommonModule } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <input 
      type="{{type}}"
      id="{{name}}"
      name="{{name}}"
      [formControl]="$any(formGroup.get(name))"
      [attr.maxLength]="maxLength"
      [attr.placeholder]="placeholder"
      class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      [ngClass]="{'ring-red-500': !this.formGroup.get(this.name)?.valid && formGroup.get(name)?.touched}"
      >
      <!-- {{this.formGroup.get(this.name)?.valid}} -->
  `
})
export class FormFieldTextComponent implements OnInit {
  @Input() formGroup!: FormGroup<string | null>;
  @Input() name!: string;
  @Input() maxLength: number| null = null;
  @Input() type!: string;
  @Input() placeholder?: string| undefined;
  
  ngOnInit() {

  }
}
