import { Component, OnInit } from '@angular/core';
import { ApiService, Categorie, Farmer, Image } from 'src/app/services/api.service';

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

  //Categorie
  idCat!: string;
  nomCat!: string;
  descriptionCat!: string;


  ngOnInit() {
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
}
