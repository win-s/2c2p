
import { PipeTransform, Pipe, Inject, LOCALE_ID, DEFAULT_CURRENCY_CODE } from "@angular/core";
import { CurrencyPipe,DecimalPipe } from "@angular/common";


@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {
constructor(
      @Inject(LOCALE_ID) private _locale: string,
      @Inject(DEFAULT_CURRENCY_CODE) private _defaultCurrencyCode: string = 'USD') {}

  transform(...args: Parameters<CurrencyPipe['transform']>) {
    const [amount,currencyCode = this._defaultCurrencyCode,display,digitalsInfo] = args;
    const transformedCurrency = new CurrencyPipe(this._locale, this._defaultCurrencyCode).transform(...args);


    if(transformedCurrency === null)return '';
    const amountNumber = Number(amount ?? 0);
    const integer = parseInt( amount + '');
   
    let decimal = new DecimalPipe(this._locale).transform(amountNumber - integer,digitalsInfo);

    if (display !== 'code' && transformedCurrency!=null)  {
      const [first, ...rest] = transformedCurrency;
      return `${integer}${decimal}${first}`;
    }else{
      return `${integer}${decimal} ${currencyCode}`;
    }
  }

}
