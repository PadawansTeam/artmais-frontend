import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PagamentoplanosService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.token == undefined || this.token == null) {
      this.router.navigate(['']);
    }
  }

  insertPagamento(infos: { transactionAmount: number, cardToken: string, installments: number, paymentMethodId: string, email: string }): Observable<any> {
    return this.http.post(`${this.artPlusURL}` + `v1/Payment/PaymentCreateRequest`, {
      transactionAmount: infos.transactionAmount,
      cardToken: infos.cardToken,
      description: " ",
      installments: infos.installments,
      paymentMethodId: infos.paymentMethodId,
      email: infos.email
    }, this.httpOptions);
  }
}
