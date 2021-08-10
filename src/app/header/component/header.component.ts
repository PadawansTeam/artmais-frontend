import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  className!: string;
  mobile: boolean = false;


  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 768) {
      this.mobile = true;
    }
  }

}
