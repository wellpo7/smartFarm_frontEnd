import { Localisation } from "./localisation"

export class Fermier{
    id!:string
    nom!:string
    email!:string
    motDePasse!:string
    telephone!:number
    localisationDto!:Localisation
    constructor(){
        this.id = ""
        this.nom = ""
        this.email = ""
        this.motDePasse = ""
        this.telephone = 0
        this.localisationDto = new Localisation();

    }
}