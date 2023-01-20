import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabContainerPage } from './tab-container.page';

const routes: Routes = [
  {
    path: '',
    component: TabContainerPage,
    children : [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'my-articles/:idCategorie',
        loadChildren: () => import('../my-articles/my-articles.module').then( m => m.MyArticlesPageModule)
      },
      {
        path: 'my-articles',
        loadChildren: () => import('../my-articles/my-articles.module').then( m => m.MyArticlesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabContainerPageRoutingModule {}
