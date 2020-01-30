import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyShopPage } from './my-shop.page';

const routes: Routes = [
  {
    path: '',
    component: MyShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyShopPageRoutingModule {}
