import { Directive,Input, HostListener } from '@angular/core';

export enum Pattern {
  decimals='decimals',
  numbers='numbers',
  alphaSpace='alphaSpace',
  monthYear='monthYear',
}
 
@Directive({
  selector: '[appPermit]',
  standalone: true
})
export class PermitDirective {

  @Input('appPermit') pattern!: Pattern | string;

  private categories: { [key in  Pattern]: string; }= {
    decimals: '^[0-9]+(\\.[0-9]{0,2}){0,1}$',
    numbers: '^\\d+$',

    alphaSpace: '^[A-Za-z ]$',
    monthYear:'^[0-9/]$'
  };

  constructor() {}

  @HostListener('keydown', ['$event']) onKeyDown(e: any) {
    switch (true) {
      case e.metaKey:
      case e.ctrlKey:
      case e.altKey:
      case e.key?.length !== 1:
        return true;
      default:
        return this.isValidText(e.key);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    return false;
  }

  isValidText( text: string = '') {

    return new RegExp(this.categories[this.pattern as Pattern] || this.pattern).test(
        text
    );
  }

}
