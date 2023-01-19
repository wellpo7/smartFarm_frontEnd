import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleAddPageRoutingModule } from './article-add-routing.module';

import { ArticleAddPage } from './article-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleAddPageRoutingModule
  ],
  declarations: [ArticleAddPage]
})
export class ArticleAddPageModule {}
