import { IOrder } from './../utils/models/order.interface';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OrderRepository {

    private COLLECTION_END = 'orders';
    private ordersCollection: AngularFirestoreCollection<IOrder>;
    private orders: Observable<IOrder[]>;

    constructor(private db: AngularFirestore) {
        console.log('User Repository Ready');
        this.ordersCollection = this.db.collection<IOrder>(`${this.COLLECTION_END}`);
    }

    getOrdersByIdUser(idUser): Observable<IOrder[]> {
        this.ordersCollection.ref.where('idUser', '==', `${idUser}`);
        this.ordersCollection.ref.orderBy('created_at', 'desc');
        this.orders = this.ordersCollection.valueChanges();
        return this.orders;
    }

    addOrderFirestore(order: IOrder) {
        return new Promise(async (resolve, reject) => {
            const id = this.db.createId();
            order._id = id;
            await this.ordersCollection.doc(id).set(order).then(
                () => resolve(order),
                err => resolve(err)
            ).catch(
                e => reject(e)
            );
        });
    }

}
