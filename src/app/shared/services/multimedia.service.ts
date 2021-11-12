import { ComponentFactoryResolver, EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, observable, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  myIbservable1$: BehaviorSubject<any> = new BehaviorSubject('✔✔✔✔')

  public trackInfo: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {

    this.audio = new Audio()

    this.trackInfo.subscribe(
      responseOK => {
        if (responseOK) {
          console.log('Musica ', responseOK)
          this.setAudio(responseOK)
        }
      })

    this.listenAllEvents()

    //El ejemplo proximo es cuando definimos myIbservable1$ como Subject<any>
    //Un Subject es un observer y un observable a la vez
    //Tambie podemos usar esos metodos con BehaviorSubject, sin embargo, se requiere
    //inicializar la variable "myIbservable1$:BehaviorSubject<any>=new BehaviorSubject('✔✔✔✔')"

    // setTimeout(()=>{
    //   this.myIbservable1$.next('✔✔✔')
    // },1000)

    // setTimeout(()=>{
    //   this.myIbservable1$.error('🚨🚨🚨🚨')
    // },2000)

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

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break;

      case 'playing':
        this.playerStatus$.next('playing')
        break;

      case 'ended':
        this.playerStatus$.next('ended')
        break;

      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  private calculateTime = () => {
    console.log('Disparando evento')
    const { duration, currentTime } = this.audio
    console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime:number,duration:number):void{
    let percentage=(currentTime*100)/duration
    this.playerPercentage$.next(percentage)
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    // 00:00 ---> 01:05 ---> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayaMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayaMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayaMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayaMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  //Funciones Publicas

  public setAudio(track: TrackModel): void {
    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer():void{
    (this.audio.paused)?this.audio.play():this.audio.pause()
  }

  public seekAudio(percentage:number):void{
    const {duration}=this.audio
    const percentageToSecond=(percentage*duration)/100
    this.audio.currentTime=percentageToSecond
  }
}
