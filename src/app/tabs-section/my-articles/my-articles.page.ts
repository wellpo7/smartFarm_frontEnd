import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Article } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {

  articles: Article[] = []
  isLoaded: boolean = false

  constructor(
    private smartfarm: ApiService,
    private route:ActivatedRoute
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    let idFarmer: string = localStorage.getItem("idFarmer") || "";
    let idCategory: string = this.route.snapshot.paramMap.get("idCategorie") || "";
    if(idCategory == ""){
      await this.smartfarm.getArticlesFarmer(idFarmer).subscribe((val: any) => {
        this.articles = val;
        this.isLoaded = true;
      })
    }else{
      await this.smartfarm.getArticlesFarmerByCategory(idFarmer, idCategory).subscribe((val: any) => {
        this.articles = val;
        this.isLoaded = true;
      })
    }
  }

}
