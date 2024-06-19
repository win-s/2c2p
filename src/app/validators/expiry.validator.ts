import { AbstractControl } from "@angular/forms";
import { DateTime } from 'luxon';

export const EXPIRY_FORMAT_ERROR = 'EXPIRY_FORMAT_ERROR';
export const EXPIRY_IN_PAST_ERROR = 'EXPIRY_IN_PAST_ERROR';
export const EXPIRY_NOT_EXIST_ERROR = 'EXPIRY_NOT_EXIST_ERROR';

const ExpiryRegex = /^[0-9]{2}\/[0-9]{2}$/

export function ExpiryValidator(control: AbstractControl) {
    const controlValue = control.value as string;
  
    if(controlValue){
        
        if(ExpiryRegex.test(controlValue)){
            const today = DateTime.local();
            const [momth,year] = controlValue.split('/');

            const inputDate = DateTime.fromISO(`${today.toFormat('yyyy').slice(0,2)}${year}-${momth}-${today.toFormat('dd')}`);
            const todayCompareDate = DateTime.fromISO(`${today.toFormat('yyyy-MM')}-${today.toFormat('dd')}`);

            if(!inputDate.isValid){
                return {
                    [EXPIRY_NOT_EXIST_ERROR]:true,
                }
            }

            if(todayCompareDate > inputDate){
                return {
                    [EXPIRY_IN_PAST_ERROR]: true,
                }
            }

        }else{
            return {
                [EXPIRY_FORMAT_ERROR]: true
            };
        }
        return null;
      
    }
    
    return null;
}