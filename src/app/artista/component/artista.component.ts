import { Component, OnInit } from '@angular/core';
import { Artista } from '../service/artista';
import { ArtistaService } from '../service/artista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from '../service/Portfolio';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
})
export class ArtistaComponent implements OnInit {
  artist!: Artista;
  idUser!: number;
  artistPortfolioContent: {image: Portfolio[], video: Portfolio[], audio: Portfolio[]} = {image: [], video: [], audio: []};
  loggedUser: boolean = false;
  roleUser: boolean = false;

  constructor(
    public artistaService: ArtistaService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public recommendationService: RecommendationService
  ) {}

  ngOnInit(): void {
    this.seeIfLogged();
    this.recommendationService.ngOnInit();
    this.roleIfClient();  
    this.idUser = this.route.snapshot.params['id'];
    this.artistaService.getArtista(this.idUser).subscribe(
      (response: Artista) => {
        this.artist = response;
      },
      (err) => {
        throw err;
      }
    ),
    this.artistaService.getPortfolioArtista(this.idUser).subscribe(
      (response) => {
        this.artistPortfolioContent = response as {image: Portfolio[], video: Portfolio[], audio: Portfolio[]};
      },
      (err) => {
        throw err;
      }
    );
  }

  seeIfLogged(){
    if (this.artistaService.token == undefined || this.artistaService.token == null) {
      this.loggedUser = false;
    }else{
      this.artistaService.getValidation().subscribe(
        (response) => {
          this.loggedUser = true;
        }, 
        (err) => {
          this.loggedUser = false;
        }
      );
    }
  }

  showModal(image: any, descrption: any, modal: any) {
    var options: NgbModalOptions = { size: 'lg' };
    const modalRef = this.modalService.open(modal, options);
    modalRef.componentInstance.image = image;
    modalRef.componentInstance.descrption = descrption;
  }

roleIfClient(){    
  this.recommendationService.getRole().subscribe(
  (response) => {
    console.warn('response Client',response.role);
    if(response.role === 'Client'){
      this.roleUser = true;
    } else {
      this.roleUser = false;
    }
   }
);
}  
}