import { Component, OnInit } from '@angular/core';
import { Categorie, ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  isLoaded:boolean = false;
  categories:Categorie[] = [];

  constructor(
    private smartFarm:ApiService
  ) {} 

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.smartFarm.getAllCategories().subscribe((val:any) => {
      localStorage.removeItem("categories")
      localStorage.setItem("categories", JSON.stringify(val))
      this.categories = val
      this.isLoaded = true;
    })
  }
}
