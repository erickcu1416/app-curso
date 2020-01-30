import { MessagesController } from './../../../utils/controllers/messages.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private messagesCtrl: MessagesController) { }

  ngOnInit() {
  }

  showOptions() {
    this.messagesCtrl.presentActionSheet();
  }

}
