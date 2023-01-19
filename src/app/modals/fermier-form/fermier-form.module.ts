import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FermierFormPageRoutingModule } from './fermier-form-routing.module';

import { FermierFormPage } from './fermier-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FermierFormPageRoutingModule
  ],
  declarations: [FermierFormPage],
  exports: [FermierFormPage]
})
export class FermierFormPageModule {}
