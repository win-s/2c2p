import { Component,Input ,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormFieldTextComponent } from '../form-field-text/form-field-text.component';

import { EmailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-form-field-email',
  standalone: true,
  imports: [
    FormFieldTextComponent,
  ],
  template: `
    <app-form-field-text 
      name="{{name}}"
      [formGroup]="formGroup"
      placeholder="a@gmail.com"
      type="text"
      ></app-form-field-text>
  `,
})
export class FormFieldEmailComponent implements OnInit{
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() maxLength: number| null = null;

  ngOnInit(){
    this.formGroup.controls[this.name]?.addValidators(EmailValidator);
  }
}
