import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EditProfilePage } from 'src/app/modals/edit-profile/edit-profile.page';
import { ApiService, Farmer } from 'src/app/services/api.service';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  farmer!: Farmer;
  private map: any;
  isLoaded: boolean = false;

  constructor(
    private smartFarm: ApiService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }


  async ngOnInit() {
    let idFarmer: string = localStorage.getItem("idFarmer") || "";
    await this.smartFarm.getFarmerData(idFarmer).subscribe((val: any) => {
      this.farmer = val;
      this.isLoaded = true;
    });
    const timer = setInterval(() => {
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

    this.map.flyTo([parseFloat(this.farmer.localisationDto.latitude), parseFloat(this.farmer.localisationDto.longitude)], 13);

    const icon = L.icon({
      iconUrl: '/assets/img/marker-icon.png',
      shadowUrl: '/assets/img/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    const marker = L.marker([parseFloat(this.farmer.localisationDto.latitude), parseFloat(this.farmer.localisationDto.longitude)], { icon }).bindPopup('Vous êtes ici');
    marker.addTo(this.map);
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        fermier: this.farmer
      }
    });
    await modal.present();

    const { role, data } = await modal.onDidDismiss();

    if (data) {
      console.log(data);
      this.smartFarm.updateFarmerData(data).subscribe((val: any) => this.presentToast(val));
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
