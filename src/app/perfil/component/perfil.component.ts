import { Component, OnInit } from '@angular/core';
import { Perfil } from '../service/perfil';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  profile!: Perfil;

  constructor(
    public perfilService: PerfilService,
  ) { }

  ngOnInit(): void {
    this.perfilService.getUser().subscribe(
      (response: Perfil) => {
        console.log(response)
        this.profile = response;
      },
      (err) => {
        throw err;
      }
    )
  }

}
