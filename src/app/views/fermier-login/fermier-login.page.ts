import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerService } from 'src/app/services/farmer.service';

@Component({
  selector: 'app-fermier-login',
  templateUrl: './fermier-login.page.html',
  styleUrls: ['./fermier-login.page.scss'],
})
export class FermierLoginPage implements OnInit {

  constructor(private farmerServ: FarmerService, private router:Router) { }

  email!: string;
  password!: string;
  idFarmer!: any;

  ngOnInit() {
  }

  login() {
    let loginInfos = {
      // "email": "sylveretedongmo@gmail.com",
      // "password": "sylver02",
      "email": this.email,
      "password": this.password
    }
    console.log(loginInfos);
    this.farmerServ.login(loginInfos).subscribe((datas) => {
      console.log("idFarmer " + datas.idFarmer)
      this.idFarmer = datas;
      localStorage.removeItem("idFarmer")
      localStorage.setItem("idFarmer", datas.idFarmer)
      this.router.navigate(['/dashboard/home']);
    })

  };


}
