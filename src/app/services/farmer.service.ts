import { Injectable } from '@angular/core';

export interface Farmer {
  id: number,
  nom: string,
  email: string,
  motDePasse: string,
  telephone: number,
  localisationDto: number
}

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor() { }
}
