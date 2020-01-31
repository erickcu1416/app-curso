import { IFlower } from './../utils/models/flower.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: IFlower[] = [];

  constructor() {}

  async addFlower(flower: IFlower, quanty: number) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < quanty; index++) {
        this.cart.push(flower);
      }
      console.log('Cart', this.cart);
    });
  }

  async deleteFlower(flower: any) {
    return new Promise((resolve, reject) => {
      while (flower.quanty > 0) {
        flower.quanty--;
        this.cart.splice(this.cart.findIndex(x => x.id === flower.id), 1);
      }
      resolve(this.cart);
    });
  }

  getCart() {
    return this.cart;
  }

}
