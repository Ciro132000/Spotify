import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  datTracksTrending$:Observable<TrackModel[]> = of([]); 

  datTracksRandom$:Observable<any> = of([]);

  constructor() {
    const {data}:any=(dataRaw as any).default

    this.datTracksTrending$ = of(data)

    this.datTracksRandom$ = new Observable((observer)=>{
      
      const trackExample: TrackModel={
        _id:9,
        name:'De musica legera',
        album:'Soda Stereo',
        url:'http://',
        cover:'https://ca-times.brightspotcdn.com/dims4/default/b747f49/2147483647/strip/true/crop/1026x1334+0+0/resize/1080x1404!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe2%2F71%2Fd1cce0b6445eb40e560b06ddaf1e%2Fla-rompen-en-espanol-1251896.JPG'
      }

      setTimeout(()=>{
        observer.next([trackExample])
      },3500)

    })
  }
}
