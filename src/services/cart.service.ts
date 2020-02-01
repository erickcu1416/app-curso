import { IOrder } from './../utils/models/order.interface';
import { AuthService } from './auth.service';
import { OrderRepository } from './../repositories/orders.repository';
import { IFlower } from './../utils/models/flower.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: IFlower[] = [];

  constructor(private _orderRepository: OrderRepository,
              private _authService: AuthService) {}

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

  async doBuy() {
    return new Promise(
      async (resolve, reject) => {
      const user = await this._authService.getUser();
      const order: IOrder = {
        _idUser: user._id.toString(),
        flowers: this.cart,
        created_at: new Date(),
        status: 'ESPERA',
        active: true,
      };
      const o = await this._orderRepository.addOrderFirestore(order);
      resolve(o);
    });
  }

}
