import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fermier-login',
  templateUrl: './fermier-login.page.html',
  styleUrls: ['./fermier-login.page.scss'],
})
export class FermierLoginPage implements OnInit {

  constructor(private api: ApiService) { }

  email!: string;
  password!: string;


  ngOnInit() {
  }

  login() {
    let loginInfos = {
      "email": "philbatou@gmail.com",
      "password": "hisoka44",
      // "email": this.email,
      // "password": this.password
    }
    console.log(loginInfos);
    this.api.loginFarmer(loginInfos).subscribe((datas) => {
      console.log("idFarmer " + datas.idFarmer)
      localStorage.removeItem("idFarmer")
      localStorage.setItem("idFarmer", JSON.stringify(datas.idFarmer))
    })

  };

}