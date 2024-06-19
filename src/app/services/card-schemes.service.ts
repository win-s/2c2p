import { Injectable,inject } from '@angular/core';
import { CardScheme, STATUS } from './card-schemes.type';
import { BehaviorSubject,map } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CardSchemesService {

  url = 'https://uat3ds.2c2p.com/emv3ds/mockservice/masterdata/cardschemes';
  private _cardSchemes$ = new BehaviorSubject<CardScheme[]|null>(null);
  private _status$= new BehaviorSubject<STATUS>(STATUS.NOT_LOAD);

  http: HttpClient = inject(HttpClient);
  

  showSchemes:string[] = ['visa','mastercard','jcb','amex'];

  constructor() { 
  }

  get status$(){
    return this._status$.asObservable();
  }
  get cardSchemes$(){
    return this._cardSchemes$.asObservable();
  }

  public load(){
    this._status$.next(STATUS.LOADING)
    this.http
      .get<CardScheme[]>(this.url)
      .pipe(
        map( (data)=> {
          return data.filter( item => this.showSchemes.includes(item.name.toLowerCase()))
        })
      )
      .subscribe({
        next: (data)=>{
          this._cardSchemes$.next( data);
          this._status$.next(STATUS.LOADED);
          return;
        },
        error:(error)=>this._status$.next(STATUS.ERROR)
      })
  }

}
