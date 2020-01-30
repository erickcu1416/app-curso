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

  cart: IFlower[] = [];

  constructor(private messagesCtrl: MessagesController,
              private _cartService: CartService) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cart = this._cartService.getCart();
  }

  showOptions() {
    this.messagesCtrl.presentActionSheet();
  }

}
