import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../usuarios/service/usuarios.service';
import { HeaderLog } from '../service/headerlog';
import { HeaderLogService } from '../service/headerlog.service';

@Component({
  selector: 'app-headerlog',
  templateUrl: './headerlog.component.html',
  styleUrls: ['./headerlog.component.css'],
})
export class HeaderlogComponent implements OnInit {
  profile!: HeaderLog;
  className!: string;
  mobile: boolean = false;
  search: String | undefined;

  constructor(
    public usuariosService: UsuariosService,
    public headerLogService: HeaderLogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.screen.width < 768) {
      this.mobile = true;
    }
    this.headerLogService.getUser().subscribe(
      (response: HeaderLog) => {
        this.profile = response;
      },
      (err) => {
        throw err;
      }
    )
  }

  goSearch() {
    var x = window.location.href.split('/');
    if (x[x.length - 2] == 'pesquisa') {
      if (this.search === x[x.length - 1]) {
        window.location.reload();
      } else {
        this.router.navigate(['/pesquisa', this.search]);
        setInterval(() => {
          window.location.reload();
        }, 500);
      }
    } else {
      this.router.navigate(['/pesquisa', this.search]);
    }
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
