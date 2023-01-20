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
  id: string,
  nom: string,
  email: string,
  motDePasse: string,
  telephone: number,
  localisationDto: Localisation
}

export interface Categorie {
  id: string,
  nom: string,
  description: string,
}

export interface Image {
  id: string,
  name: string,
  data: Blob,
}

export interface Article {
  id: string,
  nom: string,
  description: string,
  prixU: number,
  quantite: number,
  categorieDto: Categorie,
  imageDto: Image,
  fermierDto: Farmer,
}

export interface Livraison {
  id: string,
  date: Date,
  statutLivraison: string,
  localisationDto: Localisation,
}

export interface FarmerLogin {
  email: string,
  password: string,
}

export interface Customer {
  id: string,
  nom: string,
  email: string,
  motDePasse: string,
  telephone: number,
}

export interface Commande {
  id: string,
  date: Date,
  livre: boolean
  statutCommande: string,
  clientDto: Customer,
  livraisonDto: Livraison,
}

export interface DisplayCommande {
  articleDto: Article,
  infoCommandes: InfoCommande[],
}

export interface InfoCommande {
  idCommande: string,
  quantite: number,
}

export interface Produit {
  articleDto: Article,
  quantity: number,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  loginFarmer(loginInfos: FarmerLogin): Observable<any> {
    return this.http.post(`${BASE_URL}/fermier/signin`, loginInfos)
  }
  saveFarmer(farmer: Farmer){
    return this.http.post(`${BASE_URL}/fermier/createaccount`, farmer, { responseType: 'text' });
  }

  saveArticle(articleInfos: Article): Observable<any> {
    const idFarmer = localStorage.getItem("idFarmer")
    //@ts-ignore
    const id = JSON.parse(idFarmer)
    return this.http.post(`${BASE_URL}/article/fermier/${id}/save`, articleInfos)
  }

  getFarmerData(id: string) {
    return this.http.get(`${BASE_URL}/fermier/${id}/data`);
  }

  getArticlesFarmer(id: string) {
    return this.http.get(`${BASE_URL}/article/fermier/${id}/all`);
  }

  getArticlesFarmerByCategory(id:string, idCategory:string) {
    return this.http.get(`${BASE_URL}/article/fermier/${id}/${idCategory}/searchByCategorie`);
  }

  getArticleData(id: string) {
    return this.http.get(`${BASE_URL}/article/${id}/data`);
  }

  getCommandes(id: string) {
    return this.http.get(`${BASE_URL}/article/fermier/${id}/commandes`);
  }

  getAllCategories() {
    return this.http.get(`${BASE_URL}/category/all`)
  }

  getDetailCommande(id: string) {
    return this.http.get(`${BASE_URL}/commande/${id}/data`);
  }

  updateFarmerData(farmer: Farmer) {
    return this.http.post(`${BASE_URL}/fermier/${farmer.id}/update`, farmer, { responseType: 'text' });
  }

  updateStatutCommande(id: string, state: string) {
    return this.http.get(`${BASE_URL}/commande/${id}/update/state/${state}`, { responseType: 'text' });
  }

  updateStatutLivraison(id: string, state: string) {
    return this.http.get(`${BASE_URL}/livraison/${id}/update/state/${state}`, { responseType: 'text' });
  }

  deleteArticle(id: string){
    return this.http.get(`${BASE_URL}/article/${id}/delete`, { responseType: 'text' });
  }
  
}
