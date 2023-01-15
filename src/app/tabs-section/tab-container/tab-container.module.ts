import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabContainerPageRoutingModule } from './tab-container-routing.module';

import { TabContainerPage } from './tab-container.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabContainerPageRoutingModule
  ],
  declarations: [TabContainerPage]
})
export class TabContainerPageModule {}
