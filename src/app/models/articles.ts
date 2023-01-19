import { Categorie } from "./categorie"
import { Fermier } from "./farmer"
import { Image } from "./image"

export class Article{
    id:string = ""
    nom:string = ""
    description:string = ""
    prixU:number = 0
    quantite:number = 0
    categorieDto:Categorie = new Categorie()
    imageDto:Image = new Image()
    fermierDto:Fermier = new Fermier()
    constructor(){}
}