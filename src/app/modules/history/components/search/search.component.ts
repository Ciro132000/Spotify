import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()callBackData:EventEmitter<any>=new EventEmitter()

  src:string=''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term:string):void{
    //Aplicaremos limites de letras para enviar la peticion a la API
    if(term.length >= 3){
      this.callBackData.emit(term);
      console.log('😁 Llamamos a nuestra API HTTP GET ---> ',term)
    }
  }

}
