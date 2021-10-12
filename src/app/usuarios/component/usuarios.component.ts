import { Component, OnInit } from '@angular/core';
import { Recommendation } from 'src/app/homepage/service/recommendation';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { Router } from '@angular/router';
import { Usuarios } from '../service/usuarios';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {

  public recomendacao: Recommendation [] = [];
  public usuarios: Usuarios [] = [];

  searchSuccess: boolean = false;

  constructor(
    public recommendationService: RecommendationService,
    public usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit() {
    var x = window.location.href.split("/");
    this.usuariosService.getSearch(x[x.length-1]).subscribe(
      (response)=>{
        this.searchSuccess = true;
        this.usuarios = response as Usuarios[];
      },
      (err)=>{
        this.searchSuccess = false;
      }
    )
  }

  getPerfilById(id: number) {
    this.recommendationService.visitedProfiles(id).subscribe(
      () => {
        this.router.navigate(['/artista', id]);
      },
      (err) => {
        throw err;
      }
    );
  }
}
