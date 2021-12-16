import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {
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

  getUnloggedPublication(userId: number, publicationId: number): Observable<any> {
    return this.http.get(`${this.artPlusURL}` + `v1/Publication/GetPublicationById/${publicationId}/${userId}`)
  }

  getLoggedPublication(userId: number, publicationId: number): Observable<any> {
    return this.http.get(`${this.artPlusURL}` + `v1/Publication/GetPublicationByIdAndLoggedUser/${publicationId}/${userId}`, this.httpOptions)
  }

  insertLike(publicationId: number): Observable<any> {
    return this.http.post(`${this.artPlusURL}` + `v1/Publication/InsertLike?publicationId=${publicationId}`, { publicationId }, this.httpOptions);
  }

  insertComment(publicationID: number, description: string): Observable<any> {
    return this.http.post(`${this.artPlusURL}` + `v1/Publication/InsertComment`, { publicationID, description }, this.httpOptions);
  }

  deleteLike(publicationId: number): Observable<any> {
    return this.http.delete(`${this.artPlusURL}` + `v1/Publication/DeleteLike?publicationId=${publicationId}`, this.httpOptions);
  }

  deletePublication(publicationId: number): Observable<any> {
    return this.http.delete(`${this.artPlusURL}` + `v1/Aws/DeletePortfolioContent/${publicationId}`, this.httpOptions);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.artPlusURL}` + `v1/Publication/DeleteComment?commentId=${commentId}`, this.httpOptions);
  }
  
  respondComment(commentId: number, description: string): Observable<any> {
    return this.http.post(`${this.artPlusURL}` + `v1/Answer/Create`, { commentId, description }, this.httpOptions);
  }

  deleteAnswer(answerId: number): Observable<any> {
    return this.http.delete(`${this.artPlusURL}` + `v1/Answer/Delete/${answerId}`, this.httpOptions);
  }

  updateDescription(publicationId: number, publicationDescription: string): Observable<object> {
    return this.http.patch<object>(`${this.artPlusURL}` + 'v1/Portfolio/UpdateDescription', { publicationId, publicationDescription }, this.httpOptions);
  }
}
