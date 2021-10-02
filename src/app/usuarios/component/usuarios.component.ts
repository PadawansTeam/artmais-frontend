import { Component, OnInit } from '@angular/core';
import { Recommendation } from 'src/app/homepage/service/recommendation';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Recommendation[] = [];

  constructor(
    public recommendationService: RecommendationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recommendationService.recomentationUsers().subscribe((response) => {
      this.usuarios = response as Recommendation[];
    });
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
