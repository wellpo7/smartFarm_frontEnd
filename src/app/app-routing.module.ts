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
    loadChildren: () => import('./views/fermier-login/fermier-login.module').then(m => m.FermierLoginPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./modals/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'commande',
    loadChildren: () => import('./views/commande/commande.module').then(m => m.CommandePageModule)
  },
  {
    path: 'article-details/:id',
    loadChildren: () => import('./views/article-details/article-details.module').then(m => m.ArticleDetailsPageModule)
  },
  {
    path: 'article-form',
    loadChildren: () => import('./modals/article-form/article-form.module').then(m => m.ArticleFormPageModule)
  },
  {
    path: 'commande-details/:id/total/:total',
    loadChildren: () => import('./views/commande-details/commande-details.module').then( m => m.CommandeDetailsPageModule)
  },
  {
    path: 'fermier-form',
    loadChildren: () => import('./modals/fermier-form/fermier-form.module').then( m => m.FermierFormPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
