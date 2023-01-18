import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FermierLoginPage } from './fermier-login.page';

const routes: Routes = [
  {
    path: '',
    component: FermierLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FermierLoginPageRoutingModule {}
