import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../service/recommendation';
import { RecommendationService } from '../service/recommendation.service';
import { ArtistaService } from '../../artista/service/artista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  recommendations: Recommendation[] = [];

  constructor(
    public recommendationService: RecommendationService,
    public artistaService: ArtistaService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  
}
