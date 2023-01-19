import { Localisation } from "./localisation"

export class Livraison{
    id:string = ""
    date:Date = new Date()
    statutLivraison:string = ""
    localisationDto:Localisation = new Localisation()
    constructor(){}
}