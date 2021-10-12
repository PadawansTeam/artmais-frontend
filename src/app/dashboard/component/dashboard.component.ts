import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashService.ngOnInit();
    this.dashService.getValidation().subscribe(
      (response) => {}, 
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        }else if(err.status == 500){
          this.router.navigate(['/erro']);
        }
      }
    );
  }

 

}
