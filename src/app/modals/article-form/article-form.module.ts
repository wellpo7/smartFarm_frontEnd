import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleFormPageRoutingModule } from './article-form-routing.module';

import { ArticleFormPage } from './article-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleFormPageRoutingModule
  ],
  declarations: [ArticleFormPage]
})
export class ArticleFormPageModule {}
