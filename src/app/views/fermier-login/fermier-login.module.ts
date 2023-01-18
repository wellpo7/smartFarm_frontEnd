import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FermierLoginPageRoutingModule } from './fermier-login-routing.module';

import { FermierLoginPage } from './fermier-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FermierLoginPageRoutingModule
  ],
  declarations: [FermierLoginPage]
})
export class FermierLoginPageModule {}
