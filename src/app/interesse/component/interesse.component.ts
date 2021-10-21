import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { Interesse } from '../service/interesse';
import { InteresseService } from '../service/interesse.service';

@Component({
  selector: 'app-interesse',
  templateUrl: './interesse.component.html',
  styleUrls: ['./interesse.component.css']
})
export class InteresseComponent implements OnInit {

  interests: Interesse[] = [];
  subcategories: Interesse[] = [];
  allCategories: Map<string, any[]> = new Map();
  roleUser: boolean = false;

  constructor(
    public interesseService: InteresseService,
    public recommendationService: RecommendationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interesseService.ngOnInit();
    this.roleIfClient();
    this.interesseService.getValidation().subscribe(
      (response) => {}, 
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        }else if(err.status == 500){
          this.router.navigate(['/erro']);
        }
      }
    );
    this.interesseService.getInterests().subscribe(
      (response: { subcategories: Interesse[], interests: Interesse[] }) => {
        this.interests = response.interests;
        response.subcategories = response.subcategories.sort(function (a, b) {
          return a.subcategory.localeCompare(b.subcategory);
      });
        response.subcategories.forEach((subcategory) => {
          const index = this.interests.findIndex(item => item.subcategoryID === subcategory.subcategoryID);
          let isSelected = !(index === -1);

          if (this.allCategories.has(subcategory.category)) {
            let aux = this.allCategories.get(subcategory.category) || [];
            aux.push({
              isSelected,
              subcategory: subcategory.subcategory,
              subcategoryID: subcategory.subcategoryID
            })
            this.allCategories.set(subcategory.category, aux)
          } else {
            this.allCategories.set(subcategory.category, [{
              isSelected,
              subcategory: subcategory.subcategory,
              subcategoryID: subcategory.subcategoryID
            }])
          }
        })
      },
      (err) => {
        throw err;
      }
    )
  }

  sendInterest() {
    let ids: number[] = [];
    Array.from(this.allCategories).forEach(([category, subs]) => {
      subs.forEach((subcategory) => {
        if(subcategory.isSelected){
          ids.push(subcategory.subcategoryID)
        }
      })
    })
    this.interesseService.sendInterests(ids).subscribe(
      (response) => {
        this.router.navigateByUrl('/homepage');
        return response;
      },
      (err) => {
        throw err;
      }
    );
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
