import { Component, OnInit } from '@angular/core';
import { FarmerService } from 'src/app/services/farmer.service';

@Component({
  selector: 'app-fermier-login',
  templateUrl: './fermier-login.page.html',
  styleUrls: ['./fermier-login.page.scss'],
})
export class FermierLoginPage implements OnInit {

  constructor(private farmerServ: FarmerService) { }

  email!: string;
  password!: string;
  idFarmer!: any;

  ngOnInit() {
  }

  login() {
    let loginInfos = {
      "email": "philbatou@gmail.com",
      "password": "hisoka44",
    }
    console.log(loginInfos);
    this.farmerServ.login(loginInfos).subscribe((datas) => {
      console.log("idFarmer " + datas)
      this.idFarmer = datas;
      localStorage.removeItem("idFarmer")
      localStorage.setItem("idFarmer", JSON.stringify(datas))
    })

  };


}
