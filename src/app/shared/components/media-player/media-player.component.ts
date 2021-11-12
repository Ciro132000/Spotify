import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO; programación reactiva


@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar:ElementRef=new ElementRef('')

  listaObservers$:Array<Subscription>=[];
  state:string='paused'

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {

    const observer1$=this.multimediaService.playerStatus$.subscribe(status=>this.state=status)
    this.listaObservers$=[observer1$]

    //Ejemplo de comunicacion con observables desde MultimediaService

    // const observable1$ = this.multimediaService.myIbservable1$.subscribe(
    //   (responseOk)=>{
    //     // -> next()
    //     console.log(responseOk)
    //   },
    //   (responseFail)=>{
    //     // -> error()
    //     console.log('Se tapo la tuberia ',responseFail)
    //   }
    // )
    

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

  handlePosition(event:MouseEvent):void{
    const elNative:HTMLElement=this.progressBar.nativeElement
    const {clientX}=event
    const {x,width}=elNative.getBoundingClientRect()
    const clickX=clientX-x

    const percentageFromX=(clickX*100)/width

    this.multimediaService.seekAudio(percentageFromX)

    console.log(`Click(x): ${clickX}, Width:${width}, Width Initial:${x}`)
  }
}
