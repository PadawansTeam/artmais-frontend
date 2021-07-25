import { Component, OnInit } from '@angular/core';
import { Artista } from '../service/artista';
import { ArtistaService } from '../service/artista.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artist!: Artista;

  constructor(
    public artistaService: ArtistaService
  ) { }

  ngOnInit(): void {
    this.artistaService.getArtista().subscribe(
      (response: Artista) => {
        console.log(response)
        this.artist = response;
      },
      (err) => {
        throw err;
      }
    )
  }

}
