import { IOrder } from './../../../utils/models/order.interface';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.page.html',
  styleUrls: ['./my-shop.page.scss'],
})
export class MyShopPage implements OnInit {

  loader = true;
  myOrders: IOrder[] = [];
  constructor(private _orderService: OrderService) { }

  async ngOnInit() {
    this.getMyOrders();
  }

  async getMyOrders() {
    const a = await this._orderService.getMyOrders();
    a.subscribe(
      data => {
        data.map(
          x => {
            x.created_at = this.dateFirebaseFormater(x.created_at);
            return x;
          }
        );
        this.myOrders = data;
        this.loader = false;
      }
    );
  }

  dateFirebaseFormater(d) {
    const date = new Date(d.toDate());
    return date;
  }

}
