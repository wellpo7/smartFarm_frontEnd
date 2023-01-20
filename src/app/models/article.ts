import { SafeResourceUrl } from "@angular/platform-browser"
import { Article, Categorie, Farmer } from "../services/api.service"

export class ArticleView{
    id!: string
    nom!: string
    description!: string
    prixU!: number
    quantite!: number
    categorieDto!: Categorie
    fermierDto!: Farmer
    imageUrl!:SafeResourceUrl | string

    constructor(article:Article){
        this.id = article.id
        this.nom = article.nom
        this.description = article.description
        this.prixU = article.prixU
        this.quantite = article.quantite
        this.categorieDto = article.categorieDto
        this.fermierDto = article.fermierDto
        this.imageUrl = ""
    }
}