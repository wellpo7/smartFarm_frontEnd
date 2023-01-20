import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Commande } from 'src/app/services/api.service';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.page.html',
  styleUrls: ['./commande-details.page.scss'],
})
export class CommandeDetailsPage implements OnInit {

  isLoaded:boolean = false
  private map:any
  commande!:Commande
  prixTotal:string = ""

  constructor(
    private smartfarm:ApiService,
    private route:ActivatedRoute,
    private toastController:ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    let idCommande = this.route.snapshot.paramMap.get("id") || "";
    this.prixTotal = this.route.snapshot.paramMap.get("total") || "";

    await this.smartfarm.getDetailCommande(idCommande).subscribe((val:any) => {
      this.commande = val;
      this.isLoaded = true;
    });

    const timer = setInterval(()=>{
      if(this.isLoaded && this.map == null){
        this.loadMap();
        clearInterval(timer);
      }
    }, 1000)
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.map.flyTo([parseFloat(this.commande.livraisonDto.localisationDto.latitude), parseFloat(this.commande.livraisonDto.localisationDto.longitude)], 13);

    const icon = L.icon({
      iconUrl: '/assets/img/marker-icon.png',
      shadowUrl: '/assets/img/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    const marker = L.marker([parseFloat(this.commande.livraisonDto.localisationDto.latitude), parseFloat(this.commande.livraisonDto.localisationDto.longitude)], { icon }).bindPopup('Vous êtes ici');
    marker.addTo(this.map);
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentActionSheetPaiement() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Mettre à jour le statut de la commande',
      buttons: [{
        text: 'Annuler',
        handler: () => {
          this.updatePaiement("Annulé");
        }
      }, 
      {
        text: 'Payé',
        handler: () => {
          this.updatePaiement("Payé");
        }
      },
      {
        text: 'Non Payé',
        handler: () => {
          this.updatePaiement("Non payé");
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
  
    await actionSheet.present();
  }

  async presentActionSheetLivraison() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Mettre à jour le statut de la livraison',
      buttons: [{
        text: 'Annuler',
        handler: () => {
          this.updateLivraison("Annulé");
        }
      }, 
      {
        text: 'Livré',
        handler: () => {
          this.updateLivraison("Livré");
        }
      },
      {
        text: 'Non Livré',
        handler: () => {
          this.updateLivraison("Non livré");
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
  
    await actionSheet.present();
  }
  
  async updatePaiement(state:string){
    await this.smartfarm.updateStatutCommande(this.commande.id, state).subscribe((val:any) => {
      this.presentToast(val);
      this.commande.statutCommande = state;
    })
  }

  async updateLivraison(state:string){
    await this.smartfarm.updateStatutLivraison(this.commande.livraisonDto.id, state).subscribe((val:any) => {
      this.presentToast(val);
      this.commande.livraisonDto.statutLivraison = state;
    })
  }

}
