import { GeolocationService } from './../../../services/geolocation.service';
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
  coords: any;

  constructor(private messagesCtrl: MessagesController,
              private _cartService: CartService,
              private _geolocationService: GeolocationService,
              private _messagesCtrl: MessagesController) { }

  ngOnInit() {
    this.getCart();
    this.getCoords();
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

  async getCoords() {
    this.coords = await this._geolocationService.getCoords();
    this.coords = JSON.parse(this.coords);
    console.log('Coordenadas obtenidas', this.coords);
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

  async tryBuy() {
    this.messagesCtrl.presentLoader('Procesando orden...');
    const order = await this._cartService.doBuy();
    this.messagesCtrl.hideLoader();
    this.messagesCtrl.presentAlertOk('Orden creada exitosamente');
    this.flowers.length = 0;
  }

  ionViewWillEnter() {
    this.flowers.length = 0;
    this.getCart();
  }

}
