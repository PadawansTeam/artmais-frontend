import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Artista } from 'src/app/artista/service/artista';
import { ArtistaService } from 'src/app/artista/service/artista.service';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { Assinante } from '../service/assinante';
import { AssinanteService } from '../service/assinante.service';

@Component({
  selector: 'app-assinanteprime',
  templateUrl: './assinante.component.html',
  styleUrls: ['./assinante.component.css']
})
export class AssinanteComponent implements OnInit {
  artist!: Artista;
  assinante!: Assinante;
  roleUser: boolean = false;
  ifPremium: boolean = false;
  userId: any;
  name!: string;
  endDate!: any;  
  isPremium!: Assinante;
  date!: Assinante;

  constructor(
    public recommendationService: RecommendationService,
    public assinanteService: AssinanteService,
    public artistaService: ArtistaService,

  ) { }



  ngOnInit(): void {
    this.roleIfClient();
    this.getAssinantePremium();    
    this.AssinanteIfPremium();
  }

  roleIfClient() {
    this.recommendationService.getRole().subscribe(
      (response) => {
        console.warn('response Client', response.role);
        if (response.role === 'Client') {
          this.roleUser = true;
        } else {
          this.roleUser = false;
        }
      }
    );
  }

  AssinanteIfPremium() {
    this.assinanteService.getAssinaturaPremium().subscribe(
      (response) => {
        console.warn('response artista premium', response);
        if (response.isPremium === true) {
          this.ifPremium = true;
        } else {
          this.ifPremium = false;
        }
      }
    )
  }

  getAssinantePremium() {
    this.assinanteService.getAssinaturaPremium().subscribe(
      response => {
        this.assinante = response;
      },
      (err) => {
        throw err;
      }
    )
  }


}
