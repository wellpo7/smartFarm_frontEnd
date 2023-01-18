import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeDetailsPageRoutingModule } from './commande-details-routing.module';

import { CommandeDetailsPage } from './commande-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeDetailsPageRoutingModule
  ],
  declarations: [CommandeDetailsPage]
})
export class CommandeDetailsPageModule {}
