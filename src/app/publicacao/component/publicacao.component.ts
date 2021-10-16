import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {
  className!: string;
  mobile: boolean = false;

  constructor() { }
  ngOnInit(): void {
    if (window.screen.width < 768) { 
      this.mobile = true;
  }
}

}
