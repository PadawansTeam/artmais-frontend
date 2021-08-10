import { Component, OnInit } from '@angular/core';
import { Artista } from '../service/artista';
import { ArtistaService } from '../service/artista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from '../service/Portfolio';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
    private router: Router,
    private modalService: NgbModal
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

  showModal(image: any, descrption: any, modal: any) {
    var options: NgbModalOptions = { size: 'lg' };
    const modalRef = this.modalService.open(modal, options);
    modalRef.componentInstance.image = image;
    console.log(modalRef.componentInstance.image);
    modalRef.componentInstance.descrption = descrption;
    console.log(modalRef.componentInstance.descrption);
  }
}
