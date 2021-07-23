import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../service/recommendation';
import { RecommendationService } from '../service/recommendation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  recommendations: Recommendation[] = [];

  constructor(
    public recommendationService: RecommendationService
  ) { }

  ngOnInit(): void {
    this.recommendationService.getRecommendations().subscribe(
      (response) => {
        console.log(response)
        this.recommendations = response as Recommendation[];
      },
      (err) => {
        throw err;
      }
    )
  }
}
