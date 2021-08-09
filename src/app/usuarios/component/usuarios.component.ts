import { Component, OnInit } from '@angular/core';
import { Recommendation } from 'src/app/homepage/service/recommendation';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Recommendation [] = [];

  constructor(
    public recommendationService: RecommendationService
    ) { }

  ngOnInit() {
    this.recommendationService.recomentationUsers().subscribe(
      (response)=>{
        console.log(response)
      },
      err=> console.log(err)
    )
  }

}
