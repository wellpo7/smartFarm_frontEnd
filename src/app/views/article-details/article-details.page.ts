import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService, Article } from 'src/app/services/api.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  isLoaded:boolean = false
  article!:Article

  constructor(
    private smartFarm:ApiService,
    private router:Router,
    private route:ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    let idArticle = this.route.snapshot.paramMap.get("id") || "";
    await this.smartFarm.getArticleData(idArticle).subscribe((val:any) => {
      this.article = val;
      this.isLoaded = true;
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Supprimer',
      subHeader: 'Un article',
      message: 'Voulez-vous vraiment supprimer cet article ?',
      buttons: [
        {
          text: 'Oui',
          role: 'Confirm',
          handler: () =>{
            this.onDelete();
            this.router.navigate(['/dashboard/my-articles']);
          }
        },
        {
          text: 'Non',
          role: 'Cancel',
          handler: () =>{
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async onDelete(){
    await this.smartFarm.deleteArticle(this.article.id).subscribe((val:any) => {
      this.presentToast(val);
    })
  }

}
