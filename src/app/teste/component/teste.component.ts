import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  className!: string;
  mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 768) { 
      this.mobile = true;
  }
  }

}
