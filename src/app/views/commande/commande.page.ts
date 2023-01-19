import { Component, OnInit } from '@angular/core';
import { Article, ArticleDto } from 'src/app/models/articles';
import { Commande } from 'src/app/models/commande';
import { DisplayCommande } from 'src/app/models/display';
import { InfoCommande } from 'src/app/models/info-commande';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

  commandes:Map<ArticleDto, InfoCommande[]> = new Map()
  isLoaded:boolean = false;
  displays:DisplayCommande[] = []

  constructor(
    private smartfarm:ApiService
  ) { }

  async ngOnInit() {
    let idFarmer:string = localStorage.getItem("idFarmer") || "";
    await this.smartfarm.getCommandes(idFarmer).subscribe((val:any) => {
      this.commandes = val;
      let tab = Object.entries(this.commandes);
      console.log(tab)
      this.isLoaded = true;
    })
  }

  onClick(/*idCommande:string, prixTotal:number*/ttt:any){
    console.log(this.displays)
  }

}
