import { Component, OnInit } from '@angular/core';
import { ApiService, Categorie, Farmer, Image } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.page.html',
  styleUrls: ['./article-form.page.scss'],
})
export class ArticleFormPage implements OnInit {

  constructor(private api: ApiService) { }

  id!: string;
  nom!: string;
  description!: string;
  prixU!: number;
  quantite!: number;
  categorieDto!: Categorie;
  imageDto!: Image;


  public retrieve = localStorage.getItem("categories");
  //@ts-ignore
  public categories = JSON.parse(this.retrieve)

  //Categorie
  idCat!: string;
  nomCat!: string;
  descriptionCat!: string;


  ngOnInit() {
  }

  saveArticle() {
    let article = {
      "nom": this.nom,
      "description": this.description,
      "prixU": this.prixU,
      "quantite": this.quantite,
      "categorieDto": {
        "idCat": this.idCat,
        "nomCat": this.nomCat,
        "descriptionCat": this.descriptionCat
      },
      "imageDto": {

      }
  login() {
    let article = {

      // "email": this.email,
      // "password": this.password
    }
    console.log(article);
    // this.api.loginFarmer(article).subscribe((datas) => {
    //   console.log("ResponseArticleCreation " + datas.idFarmer)
    // })

  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageBase = image.base64String;
  }
}
