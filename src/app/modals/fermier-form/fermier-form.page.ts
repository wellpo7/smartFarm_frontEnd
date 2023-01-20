import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Position } from '@capacitor/geolocation/dist/esm/definitions';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Farmer } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fermier-form',
  templateUrl: './fermier-form.page.html',
  styleUrls: ['./fermier-form.page.scss'],
})
export class FermierFormPage implements OnInit {

  popup: L.Popup = L.popup();
  private map: any;

  @Input("fermier") fermier!: Farmer;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadMap();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.fermier, 'confirm');
  }

  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition();
  }

  private loadMap(): void {
    this.map = L.map('map2').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.getCurrentPosition()
      .then((position: Position) => {
        this.map.flyTo([position.coords.latitude, position.coords.longitude], 13);

        this.fermier.localisationDto.latitude = "" + position.coords.latitude
        this.fermier.localisationDto.longitude = "" + position.coords.longitude
        const icon = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          shadowUrl: 'assets/img/marker-shadow.png',
          popupAnchor: [13, 0],
        });

        const marker = L.marker([position.coords.latitude, position.coords.longitude], { icon }).bindPopup('Angular Leaflet');
        marker.addTo(this.map);
      });
  }

}
