import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recommendation } from 'src/app/homepage/service/recommendation';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';

@Component({
  selector: 'app-perfis-all',
  templateUrl: './perfis-all.component.html',
  styleUrls: ['./perfis-all.component.css']
})
export class PerfisAllComponent implements OnInit {
  public perfis: Recommendation[] = [];


  constructor(public recommendationService: RecommendationService,
    private router: Router) { }

  ngOnInit() {
  }

  getPerfilById(id: number) {
    this.router.navigate(['/artista', id]);
  }

}