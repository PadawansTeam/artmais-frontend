import { Component, OnInit } from '@angular/core';
import { PlanosService } from '../service/planos.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  constructor(
    private planosService: PlanosService
  ) { }

  ngOnInit(): void {
    this.planosService.ngOnInit();
  }

}
