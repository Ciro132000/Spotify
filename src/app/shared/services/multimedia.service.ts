import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  
  callback:EventEmitter<any>=new EventEmitter<any>();

  myIbservable1$:BehaviorSubject<any>=new BehaviorSubject('✔✔✔✔')

  constructor() { 

    //El ejemplo proximo es cuando definimos myIbservable1$ como Subject<any>
    //Un Subject es un observer y un observable a la vez
    //Tambie podemos usar esos metodos con BehaviorSubject, sin embargo, se requiere
    //inicializar la variable "myIbservable1$:BehaviorSubject<any>=new BehaviorSubject('✔✔✔✔')"

    setTimeout(()=>{
      this.myIbservable1$.next('✔✔✔')
    },1000)

    setTimeout(()=>{
      this.myIbservable1$.error('🚨🚨🚨🚨')
    },2000)

    //El ejemplo proximo es cuando definimos myIbservable1$ como observable

    // this.myIbservable1$=new Observable(
    //   (observer:Observer<any>)=>{
    //     observer.next('agua')

    //     setTimeout(()=>{
    //       observer.complete()
    //     },2500)

    //     setTimeout(()=>{
    //       observer.next('agua')
    //     },2500)

    //     setTimeout(()=>{
    //       observer.error('x')
    //     },2500)
    //   }
    //)

  }
}
