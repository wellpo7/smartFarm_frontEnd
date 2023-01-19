import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {

  articles:Article[] = []
  isLoaded:boolean = false

  constructor(
    private smartfarm:ApiService
  ) { }

  async ngOnInit() {
    let idFarmer:string = localStorage.getItem("idFarmer")|| "";
    await this.smartfarm.getArticlesFarmer(idFarmer).subscribe((val:any) => {
      this.articles = val;
      this.isLoaded = true;
    })
  }

}
