import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../service/recommendation';
import { RecommendationService } from '../service/recommendation.service';
import { ArtistaService } from '../../artista/service/artista.service';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/perfil/service/perfil.service';
import { Perfil } from 'src/app/perfil/service/perfil';
import { NgIf } from '@angular/common';
import { response } from 'express';
import { Response } from 'aws-sdk';


@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  profile!: Perfil; 
  recommendations: Recommendation[] = [];
  roleUser: boolean = false;
  role: string = '';
  
  constructor(public recommendationService: RecommendationService,
    public artistaService: ArtistaService,
    public perfilService: PerfilService,
    private router: Router) { }  

  ngOnInit(): void {
    this.roleIfClient();
    this.perfilService.getUser().subscribe(
      (response: Perfil) => {
        this.profile = response;
      },
      (err) => {
        throw err;
      }
    ),
  this.recommendationService.ngOnInit();
  this.recommendationService.getValidation().subscribe(
    (response) => {}, 
    (err) => {
      if (err.status == 401) {
        this.router.navigate(['']);
      }else if(err.status == 500){
        this.router.navigate(['/erro']);
      }
    }
  );
  this.recommendationService.getRecommendations().subscribe(
    (response) => {
      this.recommendations = response as Recommendation[];
    },
    (err) => {
      throw err;
    }
  );
  this.recommendationService.getRole().subscribe(
    (response) => {
      this.role = response.role;
    },
    (err) => {
      throw err;
    }
  )

}

getPerfilById(id: number) {
  this.recommendationService.visitedProfiles(id).subscribe(
    () => {
      this.router.navigate(['/artista', id]);
    },
    (err) => {
      throw err;
    }
  )
}
roleIfClient(){    
    this.recommendationService.getRole().subscribe(
    (response) => {
      if(response.role === 'Client'){
        this.roleUser = true;
      } else {
        this.roleUser = false;
      }
     }
  );
  }


  
}