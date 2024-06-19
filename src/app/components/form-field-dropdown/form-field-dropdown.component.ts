import { Component, OnInit, input, inject,Input } from '@angular/core';
import { CardScheme } from '../../services/card-schemes.type';
import { CardSchemesService } from '../../services/card-schemes.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <select 
      id="{{name}}"
      name="{{name}}"

      [formControl]="$any(formGroup.get(name))"
      class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      [ngClass]="{'ring-red-500': !formGroup.get(name)?.valid && formGroup.get(name)?.touched} "
      >
      <option value="none">- Select Card Types -</option>
      @for( item of $any(cardSchemesService.cardSchemes$ | async); track item.id){
        
        <option [ngValue]="item">{{item.name | uppercase }}</option>
      }
    </select>
  `,
})
export class FormFieldDropdownComponent implements OnInit {

  @Input() formGroup!: FormGroup<string | null>;
  @Input() name!: string;

  cardSchemes: CardScheme[] | null = null;
  cardSchemesService = inject(CardSchemesService);

  ngOnInit(): void {
      this.cardSchemesService.load();
  }

}
