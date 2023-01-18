import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fermier } from '../class/farmer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
  }

  getFarmerData(id:string){
    return this.http.get(`http://localhost:8282/api/fermier/${id}/data`);
  }

  updateFarmerData(farmer:Fermier){

    return this.http.post(`http://localhost:8282/api/fermier/${farmer.id}/update`, farmer, {responseType: 'text'});
  }
}
