import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../service/perfil';
import { PerfilService } from '../service/perfil.service';
import { UserPortfolio } from '../service/UserPortfolio';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  profile!: Perfil;
  userPortfolioContent: {image: UserPortfolio[], video: UserPortfolio[], audio: UserPortfolio[]} = {image: [], video: [], audio: []};
  selectedPortfolioContent: FileList | undefined;

  portfolioContent: any = {
    publicationID: null,
    portfolioImageUrl: null,
    description: null,
  };

  portfolioDescription: any = {
    description: null,
  };

  constructor(
    public perfilService: PerfilService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.perfilService.ngOnInit();
    this.perfilService.getValidation().subscribe(
      (response) => {}, 
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        }else if(err.status == 500){
          this.router.navigate(['/erro']);
        }
      }
    );
    this.perfilService.getUser().subscribe(
      (response: Perfil) => {
        this.profile = response;
      },
      (err) => {
        throw err;
      }
    ),
      this.perfilService.getUserPortfolio().subscribe(
        (response) => {
          this.userPortfolioContent = response as {image: UserPortfolio[], video: UserPortfolio[], audio: UserPortfolio[]};
        },
        (err) => {
          throw err;
        }
      );
  }

  insertPortfolioFile() {
    const file = this.selectedPortfolioContent?.item(0);

    if (file == undefined) {
      alert('Uma imagem deve ser selecionada');
      return;
    } else {
      let formData: FormData = new FormData();
      formData.append(file.name, file);
      formData.append('description', this.portfolioContent?.description);

      this.perfilService.insertPortfolioContent(formData).subscribe(
        (response) => {
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          throw err;
        }
      );
    }
  }

  updateDescription() {
    this.perfilService
      .updatePortfolioDescription(
        this.portfolioContent.publicationID,
        this.portfolioDescription.description
      )
      .subscribe(
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  selectPortfolioFile(event: any) {
    this.selectedPortfolioContent = event.target.files;
  }

  routeUpdateEvent() {
    location.reload();
  }
}
