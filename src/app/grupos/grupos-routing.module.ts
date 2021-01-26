import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposPage } from './grupos.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposPageRoutingModule {}
