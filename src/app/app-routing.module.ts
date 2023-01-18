import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs-section/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./tabs-section/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'my-articles',
    loadChildren: () => import('./tabs-section/my-articles/my-articles.module').then(m => m.MyArticlesPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./views/profil/profil.module').then(m => m.ProfilPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./tabs-section/tab-container/tab-container.module').then(m => m.TabContainerPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./views/connexion/connexion.module').then(m => m.ConnexionPageModule)
  },
  {
    path: 'fermier-login',
    loadChildren: () => import('./views/fermier-login/fermier-login.module').then(m => m.FermierLoginPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
