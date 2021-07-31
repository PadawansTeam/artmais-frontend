import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  category: Interesse[] = [];
  allCategories: any[] = [];

  constructor(
    public interesseService: InteresseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interesseService.getInterests().subscribe(
      (response: {subcategories: Interesse[], interests: Interesse[], category: Interesse[]}) => {
        this.interests = response.interests;
        this.category = response.category;
        this.subcategories = response.subcategories;
        this.allCategories = this.subcategories.map((subcategory)=>{
          const index = this.interests.findIndex(item => item.subcategoryID === subcategory.subcategoryID);
          let rtn = subcategory;
          rtn.isSelected = !(index===-1);
          return rtn;
        });
      },
      (err) => {
        throw err;
      }
    )
  }

  sendInterest(){
    let ids: number[] = [];
    this.allCategories.forEach((x)=>{
      if(x.isSelected===true){
        ids.push(x.subcategoryID);
      }
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
}
