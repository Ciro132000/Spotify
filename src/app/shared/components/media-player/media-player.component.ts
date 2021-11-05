import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover:any={
    cover:'https://amordeimagenes.com/wp-content/uploads/2018/04/fondo-para-celular-de-mario-bros-300x300.jpg',
    album:'Mario',
    name:'Musica de mario'
  }
    
  constructor() { }

  ngOnInit(): void {
  }

}
