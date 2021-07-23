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
  teste: Recommendation[] = [{username: 'Glória Groove', backgroundPicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNADvHxU_Mw0nEyJnQ3olDb-KTE9nbVLMhvQ&usqp=CAU", userPicture: "https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", category: 'Dança', subcategory: 'Moderna'}, {username: 'Glória Groove', backgroundPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNADvHxU_Mw0nEyJnQ3olDb-KTE9nbVLMhvQ&usqp=CAU", userPicture: "https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", category: 'Dança', subcategory: 'Moderna'}, {username: 'Glória Groove', backgroundPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNADvHxU_Mw0nEyJnQ3olDb-KTE9nbVLMhvQ&usqp=CAU", userPicture: "https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", category: 'Tatuagem', subcategory: 'Pontilhismo'}];

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
