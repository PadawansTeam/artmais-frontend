import { Component, OnInit } from '@angular/core';
import { ConstrucaoService } from '../service/construcao.service';

@Component({
  selector: 'app-construcao',
  templateUrl: './construcao.component.html',
  styleUrls: ['./construcao.component.css']
})
export class ConstrucaoComponent implements OnInit {

  constructor(
    private construcaoService: ConstrucaoService
  ) { }

  ngOnInit(): void {
    this.construcaoService.ngOnInit();
  }

}
