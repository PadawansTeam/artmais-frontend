import { Component, OnInit } from '@angular/core';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';

@Component({
  selector: 'app-assinanteprime',
  templateUrl: './assinante.component.html',
  styleUrls: ['./assinante.component.css']
})
export class AssinanteComponent implements OnInit {
  roleUser: boolean = false;

  constructor(
    public recommendationService: RecommendationService) 
    { }

  

ngOnInit(): void {
  this.roleIfClient();    
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
