import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacao } from '../service/publicacao';
import { PublicacaoService } from '../service/publicacao.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {
  publicacao!: Publicacao;
  idUser!: number;
  idPublicacao!: number;
  description!: string;
  isSameUser: boolean = false;

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
    private _location: Location
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let decodedToken;
    if(localStorage.getItem('token')){
      //@ts-ignore
      decodedToken = helper.decodeToken(localStorage.getItem('token'));
    }
    this.idUser = this.route.snapshot.params['id'];
    this.idPublicacao = this.route.snapshot.params['publicationId'];
    if(decodedToken.nameid == this.idUser){
      this.isSameUser = true;
    }
    this.getPublication();
  }

  getPublication(){
    this.publicacaoService.getPublication(this.idUser, this.idPublicacao).subscribe(
      (response: Publicacao) => {
       this.publicacao = response;
       console.log(this.publicacao.mediaType)
      },
      (err) => {
        throw err;
      },
    );
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

}
