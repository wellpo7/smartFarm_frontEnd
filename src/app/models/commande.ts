import { Customer } from "./customer"
import { Livraison } from "./livraison"

export class Commande{
    id:string = ""
    date:Date = new Date()
    livre:boolean = false
    statutCommande:string = ""
    customerDto:Customer = new Customer()
    livraisonDto:Livraison = new Livraison();
    constructor(){}
}