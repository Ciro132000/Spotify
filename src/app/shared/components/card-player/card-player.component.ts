import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input() mode:'small' | 'big' = 'small'
  @Input() track: TrackModel={_id:0, name:'', album:'', url:'', cover:''};

  constructor(private multimediaSevice: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track:TrackModel):void{
  
    this.multimediaSevice.trackInfo.next(track)

    //Emitiendo la cancion al reproductor (suscribe se usa para escuchar el evento)
    // this.multimediaSevice.callback.emit(track);
  }

}
