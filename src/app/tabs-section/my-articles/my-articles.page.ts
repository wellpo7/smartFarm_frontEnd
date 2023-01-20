import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArticleView } from 'src/app/models/article';
import { ApiService, Article } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})

export class MyArticlesPage implements OnInit {

  articlesView: ArticleView[] = []
  articles: Article[] = []
  isLoaded: boolean = false

  constructor(
    private smartfarm: ApiService,
    private route:ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    let idFarmer: string = localStorage.getItem("idFarmer") || "";
    let idCategory: string = this.route.snapshot.paramMap.get("idCategorie") || "";
    if(idCategory == ""){
      await this.smartfarm.getArticlesFarmer(idFarmer).subscribe((val: any) => {
        this.articles = val;
        this.convertImageArticle()
        this.isLoaded = true;
      })
    }else{
      await this.smartfarm.getArticlesFarmerByCategory(idFarmer, idCategory).subscribe((val: any) => {
        this.articles = val;
        this.convertImageArticle();
        this.isLoaded = true;
      })
    }
  }

  convertImageArticle(){
    for(let article of this.articles){
      let art:ArticleView = new ArticleView(article);
      const reader = new FileReader();
      if(article.imageDto.data != ""){
        art.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + article.imageDto.data);
      }else{
        art.imageUrl = "../../../assets/icon/favicon.png";
      }
      this.articlesView.push(art)
    }
  }

}
