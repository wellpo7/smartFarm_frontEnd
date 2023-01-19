import { Component, OnInit } from '@angular/core';
import { ApiService, Farmer } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FermierFormPage } from 'src/app/modals/fermier-form/fermier-form.page';

@Component({
  selector: 'app-fermier-login',
  templateUrl: './fermier-login.page.html',
  styleUrls: ['./fermier-login.page.scss'],
})
export class FermierLoginPage implements OnInit {

  constructor(private api: ApiService, 
    private router: Router, 
    private loadingController: LoadingController,
    private modalController: ModalController,
    private smartFarm:ApiService,
    private toastController: ToastController) { }

  email!: string;
  password!: string;
  farmer!:Farmer;


  ngOnInit() {
    this.farmer = {
      id: "",
      nom: "",
      email: "",
      motDePasse: "",
      telephone: 0,
      localisationDto: {
        id: "",
        residence: "",
        ville: "",
        pays: "",
        region: "",
        longitude: "",
        latitude: ""
      }
    }
  }

  login() {
    this.presentLoading(2000);
    let loginInfos = {
      // "email": "sylveretedongmo@gmail.com",
      // "password": "sylver02",
      "email": this.email,
      "password": this.password
    }

    console.log(loginInfos);
    this.api.loginFarmer(loginInfos).subscribe((datas) => {
      console.log("idFarmer " + datas.idFarmer)
      localStorage.removeItem("idFarmer")
      localStorage.setItem("idFarmer", datas.idFarmer)
      this.presentLoading(0);
      this.router.navigate(['/dashboard/home']);
    })

  };

  async presentLoading(duration:number) {
    const loading = await this.loadingController.create({
      message: 'Nous vérifions vos informations...',
      duration: duration,
      spinner: 'bubbles'
    });
    await loading.present();
    
    await loading.dismiss();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
    component: FermierFormPage,
    componentProps: { fermier: this.farmer }
    });
  
    await modal.present();

    const { role, data } = await modal.onDidDismiss();

    if (data) {
      console.log(data);
      this.smartFarm.saveFarmer(data).subscribe((val: any) => {
        this.presentToast("Enregistrement effectué avec succès");
        localStorage.removeItem("idFarmer") 
        localStorage.setItem("idFarmer", val)
        this.router.navigate(['/dashboard/home']);
      });
    }
  
  }

}