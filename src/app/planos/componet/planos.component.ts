import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanosService } from '../service/planos.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  constructor(
    private planosService: PlanosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.planosService.ngOnInit();
    this.planosService.getValidation().subscribe(
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
