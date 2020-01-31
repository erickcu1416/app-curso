import { IFlower } from './../../../utils/models/flower.interface';
import { CartService } from './../../../services/cart.service';
import { MessagesController } from './../../../utils/controllers/messages.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  loader = true;
  flowers: any[] = [];

  constructor(private messagesCtrl: MessagesController,
              private _cartService: CartService) { }

  ngOnInit() {
    this.getCart();
  }

  async getCart() {
    const itemsCart = this._cartService.getCart();
    console.log('ITEMS CART', itemsCart);
    itemsCart.forEach(
      (x) => {
        if (this.flowers.length === 0) {
          this.flowers.push({quanty: 1, ...x});
        } else {
          const f = this.flowers.find(t => t.id === x.id);
          if (!f) {
            this.flowers.push({quanty: 1, ...x});
          } else {
            this.flowers.forEach(
              o => {
                if (f.id === o.id) {
                  o.quanty ++;
                }
              }
            );
          }
        }
      }
    );

    this.loader = false;
    console.log('Flowers', this.flowers);
  }

  async showOptions(flower) {
    const res = await this.messagesCtrl.presentActionSheetDelete(flower);
    if (res) {
      await this._cartService.deleteFlower(flower);
      this.flowers.length = 0;
      this.getCart();
    }
  }

  getPriceTotal() {
    const itemsCart = this._cartService.getCart();
    let price = 0;
    itemsCart.forEach(
      x => {
        price = price + x.price;
      }
    );

    return price;
  }

}
