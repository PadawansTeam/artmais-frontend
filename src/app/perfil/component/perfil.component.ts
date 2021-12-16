import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../service/perfil';
import { PerfilService } from '../service/perfil.service';
import { UserPortfolio } from '../service/UserPortfolio';
import Swal from 'sweetalert2';
import { IVideoConfig } from 'ngx-video-list-player';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  profile!: Perfil;
  userPortfolioContent: { image: UserPortfolio[], video: UserPortfolio[], audio: UserPortfolio[], externalMedia: UserPortfolio[] } = { image: [], video: [], audio: [], externalMedia: [] };
  selectedPortfolioContent: FileList | undefined;

  config: IVideoConfig = {sources:[]}

  portfolioContent: any = {
    publicationID: null,
    portfolioImageUrl: null,
    description: null,
  };

  portfolioDescription: any = {
    description: null,
  };

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    public perfilService: PerfilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.perfilService.ngOnInit();
    this.perfilService.getValidation().subscribe(
      (response) => { },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        } else if (err.status == 500) {
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
          this.userPortfolioContent = response as { image: UserPortfolio[], video: UserPortfolio[], audio: UserPortfolio[], externalMedia: UserPortfolio[] };
        },
        (err) => {
          throw err;
        }
      );
  }

  getVideos() {
    if (this.config.sources.length != 0){
      return
    } else{ 
      for(let external of this.userPortfolioContent.externalMedia){
        this.config.sources.push(
          {
            src: external.s3UrlMedia || "",
            isYoutubeVideo: true,
            videoName: external.description,
          }
        )
      }
    }
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

  insertExternalMedia() {
    this.perfilService
      .insertExternalMedia(
        this.portfolioContent.portfolioImageUrl
      )
      .subscribe(
        async (response) => {
          await this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Postagem publicada com sucesso!'
                : 'Post published successfully!',
          });
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao pulicar!'
                : 'Failed to publish!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        },
      );
  }

  updateDescription() {
    this.perfilService
      .updatePortfolioDescription(
        this.portfolioContent.publicationID,
        this.portfolioDescription.description
      )
      .subscribe(
        async (response) => {
          await this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Postagem publicada com sucesso!'
                : 'Post published successfully!',
          });
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao pulicar!'
                : 'Failed to publish!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        },
      );
  }

  selectPortfolioFile(event: any) {
    this.selectedPortfolioContent = event.target.files;
  }

  routeUpdateEvent() {
    location.reload();
  }
}
