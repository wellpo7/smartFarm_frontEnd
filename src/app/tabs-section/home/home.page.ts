import { Component, OnInit } from '@angular/core';
import { HttpOptions } from '@capacitor/core';
import { Http } from '@capacitor-community/http';
import { from } from 'rxjs';



type categorie = {
  matricule: string,
  name:string,
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  searchTerm!: string;
  searchName = '';

  Data:any[]= []
  categories:categorie[] = [];

  constructor() {}

  readApi(url:string) {
    const options:HttpOptions = {
     url
    }
    return from(Http.get(options))
   }
 
   ngOnInit() {
     this.readApi("http://localhost:8282/api/categorie/all").subscribe((res: { data: string; })=>{
       this.Data = JSON.parse(res.data)
     });
   }

  //  searchCategorie() {
  //   const search = encodeURIComponent(this.searchName).trim();
  //   console.log('Recherche de la catégorie ' + search);
  //   this.readApi('http://localhost:8282/api/categorie/' +search).subscribe((data: any) =>{
  //     console.log(data);
  //   });
  // }

}
