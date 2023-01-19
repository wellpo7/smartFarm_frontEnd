import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../models/api';
import { Fermier } from '../models/farmer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
  }

  getFarmerData(id:string){
    return this.http.get(`${BASE_URL}fermier/${id}/data`);
  }

  updateFarmerData(farmer:Fermier){

    return this.http.post(`${BASE_URL}fermier/${farmer.id}/update`, farmer, {responseType: 'text'});
  }

  getArticlesFarmer(id:string){
    return this.http.get(`${BASE_URL}article/fermier/${id}/all`);
  }

  getArticleData(id:string){
    return this.http.get(`${BASE_URL}article/${id}/data`);
  }

  getCommandes(id:string){
    return this.http.get(`${BASE_URL}article/fermier/${id}/commandes`);
  }
}
