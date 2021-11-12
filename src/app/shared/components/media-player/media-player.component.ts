import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO; programación reactiva


@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover:TrackModel={
    cover:'https://amordeimagenes.com/wp-content/uploads/2018/04/fondo-para-celular-de-mario-bros-300x300.jpg',
    album:'Mario',
    name:'Musica de mario',
    url:'http://localhost/tracks.mp3',
    _id:1
  }
  
  listaObservers$:Array<Subscription>=[];

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {

    const observable1$ = this.multimediaService.myIbservable1$.subscribe(
      (responseOk)=>{
        // -> next()
        console.log(responseOk)
      },
      (responseFail)=>{
        // -> error()
        console.log('Se tapo la tuberia ',responseFail)
      }
    )
    

    // const observer1$: Subscription = this.multimediaService.callback.subscribe(
    //   (response:TrackModel)=>{
    //     console.log('recibiendo', response)
    //   }
    // )
    // this.listaObservers$=[observer1$]
  }

  ngOnDestroy():void{
    this.listaObservers$.forEach(u=>u.unsubscribe());
  }

}
