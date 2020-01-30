import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyShopPageRoutingModule } from './my-shop-routing.module';

import { MyShopPage } from './my-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyShopPageRoutingModule
  ],
  declarations: [MyShopPage]
})
export class MyShopPageModule {}
