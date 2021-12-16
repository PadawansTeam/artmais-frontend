import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacao } from '../service/publicacao';
import { PublicacaoService } from '../service/publicacao.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";
import { RecommendationService } from '../../homepage/service/recommendation.service';
import { ArtistaService } from '../../artista/service/artista.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {
  idResposta!: number;
  publicacao!: Publicacao;
  idUser!: number;
  idPublicacao!: number;
  description!: string;
  isSameUser: boolean = false;
  roleUser: boolean = false;
  loggedUser: boolean = false;

  userDescription: any = {
    description: null,
  };

  answerDescription: any = {
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
    public publicacaoService: PublicacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public artistaService: ArtistaService,
    public recommendationService: RecommendationService
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let decodedToken;
    if(localStorage.getItem('token')){
      decodedToken = helper.decodeToken(localStorage.getItem('token')!);
    }
    this.idUser = this.route.snapshot.params['id'];
    this.idPublicacao = this.route.snapshot.params['publicationId'];
    if(decodedToken?.nameid == this.idUser){
      this.isSameUser = true;
    }
    this.seeIfLogged();
    this.getPublication();
    this.roleIfClient(); 
  }

  getPublication(){
    if(this.loggedUser == true){
      this.publicacaoService.getLoggedPublication(this.idUser, this.idPublicacao).subscribe(
        (response: Publicacao) => {
         this.publicacao = response;
        },
        (err) => {
          throw err;
        },
      );
    } else{
      this.publicacaoService.getUnloggedPublication(this.idUser, this.idPublicacao).subscribe(
        (response: Publicacao) => {
         this.publicacao = response;
         console.log(response)
        },
        (err) => {
          throw err;
        },
      );
    }
  }

  like(){
    if(!this.publicacao.isLiked){
      this.publicacaoService.insertLike(
        this.idPublicacao
      ).subscribe(
        (response) => {
          this.getPublication();
        },
        (err) => {
          throw err;
        },
      );
    } else if(this.publicacao.isLiked){
      this.publicacaoService.deleteLike(
        this.idPublicacao
      ).subscribe(
        (response) => {
          this.getPublication();
        },
        (err) => {
          throw err;
        },
      );
    }

  }

  insertComment(){
    this.publicacaoService.insertComment(
      this.idPublicacao, 
      this.description
    ).subscribe(
      async (response) => {
        await this.Toast.fire({
          icon: 'success',
          title:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Comentário postado com sucesso!'
              : 'Comment posted successfully!',
        });
        this.routeUpdateEvent();
        return response;
      },
      (err) => {
        this.Toast.fire({
          icon: 'error',
          title:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Erro ao comentar!'
              : 'Failed to comment!',
          text:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Tente novamente mais tarde!'
              : 'Try again later!',
        });
        throw err;
      },
    );
  }

  answerComment(idComentario: any){
    this.idResposta = idComentario;
  }

  respondComment(){
    this.publicacaoService.respondComment(
      this.idResposta, 
      this.answerDescription.description
    ).subscribe(
      async (response) => {
        await this.Toast.fire({
          icon: 'success',
          title:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Resposta postado com sucesso!'
              : 'Reply posted successfully!',
        });
        this.routeUpdateEvent();
        return response;
      },
      (err) => {
        this.Toast.fire({
          icon: 'error',
          title:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Erro ao responder!'
              : 'Failed to reply!',
          text:
            localStorage.getItem('lang') === 'pt-BR'
              ? 'Tente novamente mais tarde!'
              : 'Try again later!',
        });
        throw err;
      },
    );
  }

  deleteReply(idResposta: any) {
    this.publicacaoService.deleteAnswer(
      idResposta
    ).subscribe(
      (response) => {
        this.getPublication();
      },
      (err) => {
        throw err;
      },
    ); 
  }

  deleteComment(idComentario: any) {
    this.publicacaoService.deleteComment(
      idComentario
    ).subscribe(
      (response) => {
        this.getPublication();
      },
      (err) => {
        throw err;
      },
    ); 
  }

  deletePublication(){
    this.publicacaoService.deletePublication(
      this.idPublicacao
    ).subscribe(
      (response) => {
        this._location.back();
      },
      (err) => {
        throw err;
      },
    );
  }

  routeUpdateEvent() {
    location.reload();
  }

  updateDescription() {
    this.publicacaoService.updateDescription(this.idPublicacao, this.userDescription.description)
      .subscribe(
        async (response) => {
          await this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Descrição atualizada com sucesso!'
                : 'Description updated with success!',
          });
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao salvar a descrição!'
                : 'Failed to save description!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        }
      );
  }

  roleIfClient(){    
    this.recommendationService.getRole().subscribe(
      (response) => {
        if(response.role === 'Client'){
          this.roleUser = true;
        } else {
          this.roleUser = false;
        }
      }
    );
  }

  seeIfLogged(){
    if (this.artistaService.token == undefined || this.artistaService.token == null) {
      this.loggedUser = false;
    }else{
      this.artistaService.getValidation().subscribe(
        (response) => {
          this.loggedUser = true;
        }, 
        (err) => {
          this.loggedUser = false;
        }
      );
    }
  }

}
