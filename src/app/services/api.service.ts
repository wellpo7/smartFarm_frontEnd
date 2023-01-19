import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/api';

export interface Localisation {
  id: string
  residence: string
  ville: string
  pays: string
  region: string
  longitude: string
  latitude: string
}

export interface Farmer {
  id: number,
  nom: string,
  email: string,
  motDePasse: string,
  telephone: number,
  localisationDto: Localisation
}

export interface FarmerLogin {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  loginFarmer(loginInfos: FarmerLogin): Observable<any> {
    return this.http.post(BASE_URL + "/fermier/signin", loginInfos)
  }

  getFarmerData(id: string) {
    return this.http.get(BASE_URL + `/fermier/${id}/data`);
  }

  updateFarmerData(farmer: Farmer) {
    return this.http.post(BASE_URL + `/fermier/${farmer.id}/update`, farmer, { responseType: 'text' });
  }
}
