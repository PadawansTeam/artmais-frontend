import { Component, OnInit } from '@angular/core';
import { Artista } from '../service/artista';
import { ArtistaService } from '../service/artista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from '../service/Portfolio';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
})
export class ArtistaComponent implements OnInit {
  artist!: Artista;
  idUser!: number;
  portfolioImages: Portfolio[] = [];

  constructor(
    public artistaService: ArtistaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id'];
    this.artistaService.getArtista(this.idUser).subscribe(
      (response: Artista) => {
        console.log(response);
        this.artist = response;
      },
      (err) => {
        throw err;
      }
    ),
      this.artistaService.getPortfolioArtista(this.idUser).subscribe(
        (response: Portfolio) => {
          console.log(response);
          this.portfolioImages = response as Portfolio[];
        },
        (err) => {
          throw err;
        }
      );
  }
}
