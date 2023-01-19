import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { Fermier } from 'src/app/models/farmer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  popup:L.Popup = L.popup();
  private map:any;

  @Input("fermier") fermier!:Fermier;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    this.loadMap();
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(){
    return this.modalCtrl.dismiss(this.fermier, 'confirm');
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
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
    .subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 13);

      const icon = L.icon({
        iconUrl: 'assets/img/marker-icon.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup('Angular Leaflet');
      marker.addTo(this.map);
    });
  }


  async clickMap(){
    const test = (t:any) => {
      console.log(t);
      this.map.flyTo([t.lat, t.lng], 13);

      const icon = L.icon({
        iconUrl: '/assets/img/marker-icon.png',
        shadowUrl: '/assets/img/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const marker = L.marker([t.lat, t.lng], { icon }).bindPopup('Vous êtes ici');
      marker.addTo(this.map);
    }
    await this.map.on('click', function(e:any){
      test(e.latlng);
    });

    
  }
}
