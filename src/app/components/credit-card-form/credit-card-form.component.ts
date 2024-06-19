import { Component, OnInit, inject } from '@angular/core';
import { FormFieldLabelComponent } from '../form-field-label/form-field-label.component';
import { ErrorComponent } from '../error/error.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormFieldDropdownComponent } from '../form-field-dropdown/form-field-dropdown.component';
import { FormFieldTextComponent } from '../form-field-text/form-field-text.component';
import { FormFieldEmailComponent } from '../form-field-email/form-field-email.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_FORMAT_ERROR } from '../../validators/email.validator';
import { EXPIRY_FORMAT_ERROR,EXPIRY_IN_PAST_ERROR, EXPIRY_NOT_EXIST_ERROR } from '../../validators/expiry.validator';
import { FormFieldTextPermitComponent } from '../form-field-text-permit/form-field-text-permit.component';

import {ERROR_TEXT} from '../../validators/text.const';
import { ExpiryValidator } from '../../validators/expiry.validator';
import { CardSchemesService } from '../../services/card-schemes.service';
import { SELECTED_DROPDOWN_ERROR } from '../../validators/selected-dropdown.validator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [
    FormFieldLabelComponent,
    ErrorComponent,
    FormFieldComponent,
    FormFieldDropdownComponent,
    FormFieldTextComponent,
    FormFieldEmailComponent,
    FormFieldTextPermitComponent,

    ReactiveFormsModule,

  ],
  templateUrl: './credit-card-form.component.html',
})
export class CreditCardFormComponent implements OnInit{
  formGroup: FormGroup;
  EMAIL_FORMAT_ERROR = EMAIL_FORMAT_ERROR;
  ERROR_TEXT=ERROR_TEXT;
  EXPIRY_IN_PAST_ERROR=EXPIRY_IN_PAST_ERROR;
  EXPIRY_FORMAT_ERROR=EXPIRY_FORMAT_ERROR;
  EXPIRY_NOT_EXIST_ERROR=EXPIRY_NOT_EXIST_ERROR;
  SELECTED_DROPDOWN_ERROR=SELECTED_DROPDOWN_ERROR;

  JSON = JSON;

  url='https://uat3ds.2c2p.com/emv3ds/mockservice/payment'

  validatorCardNumberMin16 = Validators.minLength(16);
  validatorCardNumberMax15 = Validators.maxLength(15);
  validatorCardNumberMin15 = Validators.minLength(15);

  
  cardNumberPlaceHolder16 = 'Number with 16 digits';
  cardNumberPlaceHolder15 = 'Number with 15 digits';
  cardNumberPlaceHolder;

  submiting = false;

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  constructor(
    private fb: FormBuilder
  ){
    this.formGroup = this.fb.group({
      cardType: ['none'],
      cardNumber: ['',[Validators.required,this.validatorCardNumberMin16]],
      expiry:['',[Validators.required,ExpiryValidator]],
      fullName: ['',[Validators.maxLength(30),Validators.required]],
      email: ['',Validators.maxLength(50)],
    })
    this.cardNumberPlaceHolder = this.cardNumberPlaceHolder16;
    
  }
  ngOnInit(): void {

    this.formGroup.get('cardType')?.valueChanges.subscribe(selected=>{
      if(selected === 'none'){
        this.setDropdownError();
      }else{

        this.formGroup.get('cardType')?.setErrors(null);
        if(selected.name === 'amex'){
          if( this.formGroup.get('cardNumber')?.hasValidator(this.validatorCardNumberMin16)){
            this.formGroup.get('cardNumber')?.removeValidators(this.validatorCardNumberMin16);
            this.formGroup.get('cardNumber')?.addValidators(this.validatorCardNumberMax15);
            this.formGroup.get('cardNumber')?.addValidators(this.validatorCardNumberMin15);

            this.cardNumberPlaceHolder = this.cardNumberPlaceHolder15;
            this.formGroup.get('cardNumber')?.updateValueAndValidity();
          }
        }else{
          if( this.formGroup.get('cardNumber')?.hasValidator(this.validatorCardNumberMax15)){
            this.formGroup.get('cardNumber')?.removeValidators(this.validatorCardNumberMax15);
            this.formGroup.get('cardNumber')?.removeValidators(this.validatorCardNumberMin15);
            this.formGroup.get('cardNumber')?.addValidators(this.validatorCardNumberMin16);
            
            this.cardNumberPlaceHolder = this.cardNumberPlaceHolder16;
            this.formGroup.get('cardNumber')?.updateValueAndValidity();
          }
        }
      }
    })
  }

  setDropdownError(){
    if(this.formGroup.get('cardType')?.value === 'none'){
      this.formGroup.get('cardType')?.setErrors({[SELECTED_DROPDOWN_ERROR]:true});
    }
    
  }

  onSubmit(){
    this.formGroup.markAllAsTouched();
    this.setDropdownError();
    if(this.formGroup.valid){
      const requestPayload: any = {
        cardSchemeId: this.formGroup.get('cardType')?.value.id,
        cardNumber: this.formGroup.get('cardNumber')?.value,
        expiry: this.formGroup.get('expiry')?.value,
        name: this.formGroup.get('fullName')?.value,
      }

      if(this.formGroup.get('email')?.value){
        requestPayload.email = this.formGroup.get('email')?.value;
      }

      this.submiting = true;
      this.http.post(this.url,requestPayload).subscribe({
        
        next:(response)=>{

          this.router.navigate(['success'], {
            state: {
              response 
            },
          });
        },
        error:(response)=>{

          this.router.navigate(['fail'], {
            state: {
              response:response.error
            },
          });
        },
        complete: ()=>{
          this.submiting = false;
        }
      })
    }
  }
}
