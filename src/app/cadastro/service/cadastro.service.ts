import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Cadastro } from './cadastro';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = 'https://padawans-backend-poc.herokuapp.com/v1/singup';  

  constructor(
    private http: HttpClient,
    ) { }

    getAllCadastro(): Observable<Cadastro[]> {  
      return this.http.get<Cadastro[]>(this.url);  
    }  

    gecadastroById(cadastroid: string): Observable<Cadastro> {  
      const apiurl = `${this.url}/${cadastroid}`;
      return this.http.get<Cadastro>(apiurl);  
    } 
  
    createcadastro(cadastro: Cadastro): Observable<Cadastro> {  
      return this.http.post<Cadastro>(this.url, cadastro, httpOptions);  
    }  
  
    updatecadastro(cadastroid: string, cadastro: Cadastro): Observable<Cadastro> {  
      const apiurl = `${this.url}/${cadastroid}`;
      return this.http.put<Cadastro>(apiurl,cadastro, httpOptions);  
    }  
  
    deletecadastroById(cadastroid: string): Observable<number> {  
      const apiurl = `${this.url}/${cadastroid}`;
      return this.http.delete<number>(apiurl, httpOptions);  
    }  

}