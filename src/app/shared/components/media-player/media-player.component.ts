import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';


@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover:TrackModel={
    cover:'https://amordeimagenes.com/wp-content/uploads/2018/04/fondo-para-celular-de-mario-bros-300x300.jpg',
    album:'Mario',
    name:'Musica de mario',
    url:'http://localhost/tracks.mp3',
    _id:1
  }
    
  constructor() { }

  ngOnInit(): void {
  }

}
