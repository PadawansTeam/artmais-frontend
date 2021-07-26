import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerlog',
  templateUrl: './headerlog.component.html',
  styleUrls: ['./headerlog.component.css']
})
export class HeaderlogComponent implements OnInit {
  className!: string;
  mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 768) { 
      this.mobile = true;
  }
  }
}
