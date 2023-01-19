import { Component, OnInit } from '@angular/core';
import { DisplayCommande } from 'src/app/models/display';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

  commandes:DisplayCommande[] = []
  isLoaded:boolean = false;

  constructor(
    private smartfarm:ApiService
  ) { }

  async ngOnInit() {
    let idFarmer:string = localStorage.getItem("idFarmer") || "";
    await this.smartfarm.getCommandes(idFarmer).subscribe((val:any) => {
      this.commandes = val;
      this.isLoaded = true;
    })
  }

  onClick(idCommande:string, prixTotal:number){
    
  }

}
