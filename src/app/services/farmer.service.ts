import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  motDePasse: string,
}

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) { }

  login(loginInfos: FarmerLogin) {
    return this.http.post(BASE_URL + "singin", loginInfos)
  }
}
