import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  // datTracksTrending$:Observable<TrackModel[]> = of([]); 

  // datTracksRandom$:Observable<any> = of([]);

  constructor(private http:HttpClient ) {
    // const {data}:any=(dataRaw as any).default

    // this.datTracksTrending$ = of(data)

    // this.datTracksRandom$ = new Observable((observer)=>{
      
    //   const trackExample: TrackModel={
    //     _id:9,
    //     name:'De musica legera',
    //     album:'Soda Stereo',
    //     url:'http://',
    //     cover:'https://ca-times.brightspotcdn.com/dims4/default/b747f49/2147483647/strip/true/crop/1026x1334+0+0/resize/1080x1404!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe2%2F71%2Fd1cce0b6445eb40e560b06ddaf1e%2Fla-rompen-en-espanol-1251896.JPG'
    //   }

    //   setTimeout(()=>{
    //     observer.next([trackExample])
    //   },3500)

    // })
  }

  /**
   * 
   * @returns Devolver todas las canciones
   */

  private skipById(listTracks:TrackModel[],id:number):Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTmp=listTracks.filter(a=>a._id != id )
      resolve(listTmp)
    })
  }

  getAllTracks$():Observable<any>{
    return this.http.get(`${this.URL}/tracks`).pipe(
      map(({data}:any)=>{
        return data
      })
    )
  }

  getAllRandom$():Observable<any>{
    return this.http.get(`${this.URL}/tracks`).pipe(

      mergeMap(({data}:any)=>this.skipById(data,1)), //Filtrado de forma mas complida y sin revertir
      tap(data => console.log('ok ok ok', data)),
      catchError((err)=>{
        console.log('Algo paso', err)
        return of([])
      })
      // map(({data}:any)=>{ //TODO: Devolvemo lista de canciones revertida
      //   return data.reverse()
      // }),
      // map((dataRevertida)=>{ //TODO: aplicar un filtro comun de array
      //   return dataRevertida.filter((track:TrackModel)=>track._id != 1 )
      // })
    )
  }

}
