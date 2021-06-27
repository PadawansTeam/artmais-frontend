import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = 'https://padawans-backend-poc.herokuapp.com/v1/singup';  

  constructor(private http: HttpClient) { }

}