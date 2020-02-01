import { IOrder } from './../utils/models/order.interface';
import { AuthService } from './auth.service';
import { OrderRepository } from './../repositories/orders.repository';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    constructor(private _orderRepository: OrderRepository,
                private _authService: AuthService) {}

    async getMyOrders(): Promise<Observable<IOrder[]>> {
        return new Promise(async (resolve, reject) => {
            const user = await this._authService.getUser();
            return resolve(this._orderRepository.getOrdersByIdUser(user._id));
        });
    }
}
