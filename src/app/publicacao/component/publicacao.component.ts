import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../../artista/service/artista';
import { ArtistaService } from '../../artista/service/artista.service';
import { Publicacao } from '../service/publicacao';
import { PublicacaoService } from '../service/publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {
  publicacao!: Publicacao;
  idUser!: number;
  idPublicacao!: number;
 
  constructor(
    public publicacaoService: PublicacaoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id'];
    this.idPublicacao = this.route.snapshot.params['publicationId'];
    this.publicacaoService.getPublication(this.idUser, this.idPublicacao).subscribe(
      (response: Publicacao) => {
       this.publicacao = response;
      },
      (err) => {
        throw err;
      },
    );
  }

}
