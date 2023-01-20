import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router) { 
    localStorage.removeItem("idFarmer");
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.removeItem("idFarmer");
    this.router.navigate(['/']);
  }
}
