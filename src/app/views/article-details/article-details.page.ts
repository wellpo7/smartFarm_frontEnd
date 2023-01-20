import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ArticleView } from 'src/app/models/article';
import { ApiService, Article } from 'src/app/services/api.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  isLoaded:boolean = false
  article!:ArticleView

  constructor(
    private smartFarm:ApiService,
    private router:Router,
    private route:ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    let idArticle = this.route.snapshot.paramMap.get("id") || "";
    await this.smartFarm.getArticleData(idArticle).subscribe((val:any) => {
      this.convertImageArticle(val)
      this.isLoaded = true;
    })
  }

  convertImageArticle(article:Article){
    this.article = new ArticleView(article);
      if(article.imageDto.data != ""){
        this.article.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + article.imageDto.data);
      }else{
        this.article.imageUrl = "../../../assets/img/favicon.png";
      }
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
