import { Component, OnInit } from '@angular/core';
import { Perfil } from '../service/perfil';
import { PerfilService } from '../service/perfil.service';
import { UserPortfolio } from '../service/UserPortfolio';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  profile!: Perfil;
  userPortfolioImages: UserPortfolio[] = [];
  selectedPortfolioContent!: FileList;

  portfolioContent: any = {
    publicationID: null,
    portfolioImageUrl: null,
    description: null
  };

  portfolioDescription: any = {
    description: null,
  };

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
    ),
      this.perfilService.getUserPortfolio().subscribe(
        (response: UserPortfolio) => {
          console.log(response);
          this.userPortfolioImages = response as UserPortfolio[];
        },
        (err) => {
          throw err;
        }
      );
  }

  updateDescription() {
    this.perfilService
      .updatePortfolioDescription(this.portfolioContent.publicationID, this.portfolioDescription.description)
      .subscribe(
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  async insertPortfolioFile() {
    const file = this.selectedPortfolioContent.item(0);
    this.portfolioContent.portfolioImageUrl = await this.perfilService.uploadPortfolioFile(file!);
    this.perfilService
      .insertPortfolioContent(
        this.portfolioContent.portfolioImageUrl,
        this.portfolioContent.description
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
}
