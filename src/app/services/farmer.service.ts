import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/api';

export interface Farmer {
  id: number,
  nom: string,
  email: string,
  motDePasse: string,
  telephone: number,
  localisationDto: number
}

export interface FarmerLogin {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) { }

  login(loginInfos: FarmerLogin): Observable<any> {
    return this.http.post(BASE_URL + "fermier/signin", loginInfos)
  }
}
