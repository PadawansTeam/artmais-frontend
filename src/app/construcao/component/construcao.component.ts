import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstrucaoService } from '../service/construcao.service';

@Component({
  selector: 'app-construcao',
  templateUrl: './construcao.component.html',
  styleUrls: ['./construcao.component.css']
})
export class ConstrucaoComponent implements OnInit {

  constructor(
    private construcaoService: ConstrucaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.construcaoService.ngOnInit();
    this.construcaoService.getValidation().subscribe(
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
