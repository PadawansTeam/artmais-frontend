import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assinante } from 'src/app/assinante/service/assinante';
import { AssinanteService } from 'src/app/assinante/service/assinante.service';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { PlanosService } from '../service/planos.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {
  roleUser: boolean = false;
  isPremium!: Assinante;
  ifPremium: boolean = false;

  constructor(
    private planosService: PlanosService,
    private router: Router,
    public assinanteService: AssinanteService,
    public recommendationService: RecommendationService,

  ) { }

  ngOnInit(): void {
    this.planosService.ngOnInit();
    this.roleIfClient();
    this.AssinanteIfPremium();
    this.planosService.getValidation().subscribe(
      (response) => { },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        } else if (err.status == 500) {
          this.router.navigate(['/erro']);
        }
      }
    );
  }

  roleIfClient() {
    this.recommendationService.getRole().subscribe(
      (response) => {        
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
        if (response.isPremium === true) {
          this.ifPremium = true;
        } else {
          this.ifPremium = false;
        }
      }
    )
  }


}
