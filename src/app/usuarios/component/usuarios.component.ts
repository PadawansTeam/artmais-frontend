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
  public roleUser: boolean = false;

  searchSuccess: boolean = false;

  constructor(
    public recommendationService: RecommendationService,
    public usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuariosService.ngOnInit();
    this.roleIfClient();
    this.usuariosService.getValidation().subscribe(
      (response) => {}, 
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        }else if(err.status == 500){
          this.router.navigate(['/erro']);
        }
      }
    );
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

  roleIfClient(){    
    this.recommendationService.getRole().subscribe(
    (response) => {
      console.warn('response Client',response.role);
      if(response.role === 'Client'){
        this.roleUser = true;
      } else {
        this.roleUser = false;
      }
     }
  );
  }

}
