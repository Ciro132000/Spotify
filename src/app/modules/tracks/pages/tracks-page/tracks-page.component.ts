import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import * as dataRaw from '../../../../data/tracks.json'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending:Array<TrackModel>=[];
  tracksRandom:Array<TrackModel>=[];

  listObservers$: Array<Subscription>=[];

  constructor(private tracksService: TrackService) { }

  ngOnInit(): void {
  
    this.loadDataAll();
    this.loadDataRandom();

    //Modo inyeccion sin API

    // const observer1$ = this.tracksService.datTracksTrending$
    // .subscribe(response=>{
    //   this.tracksTrending=response;
    //   this.tracksRandom=response;
    //   console.log('Cancion trending -> ',response);
    // });

    // const observer2$ = this.tracksService.datTracksRandom$
    // .subscribe(response=>{
    //   this.tracksRandom = [...this.tracksRandom,...response]//TODO: los "..." es para concatenar, 
    //                                                         //estamos diciendo que lo q ya tienes agrega lo que esta entrando
    //   console.log('Cancion Random entrando -> ',response);
    // });

    // this.listObservers$=[observer1$, observer2$];

    // const {data}:any=(dataRaw as any).default
    // this.mockTracksList=data;
  }

  async loadDataAll():Promise<any>{

    this.tracksTrending= await this.tracksService.getAllTracks$().toPromise()

    // this.tracksService.getAllTracks$().subscribe(
    //   (response:TrackModel[])=>{
    //     this.tracksTrending=response
    //   }
    // );
  }

  loadDataRandom():void{
    this.tracksService.getAllRandom$().subscribe(
      (response:TrackModel[])=>{
        this.tracksRandom=response
      },err => {
        console.log('Error de conexion');
      }
    );
  }

  ngOnDestroy():void{
    // this.listObservers$.forEach(u=>u.unsubscribe())
  }

}
