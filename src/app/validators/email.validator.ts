import { AbstractControl } from "@angular/forms";

export const EMAIL_FORMAT_ERROR = 'EMAIL_FORMAT_ERROR';
const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export function EmailValidator(control: AbstractControl) {
    const controlValue = control.value as string;
  
    if(controlValue){
        if(EmailRegex.test(controlValue)){
            return null;
        }else{
            return {
                [EMAIL_FORMAT_ERROR]: true
            };
        }
      
    }
    
    return null;
}