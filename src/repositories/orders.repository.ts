import { IOrder } from './../utils/models/order.interface';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class OrderRepository {

    private COLLECTION_END = 'orders';
    private ordersCollection: AngularFirestoreCollection<IOrder>;

    constructor(private db: AngularFirestore) {
        console.log('User Repository Ready');
        this.ordersCollection = this.db.collection<IOrder>(`${this.COLLECTION_END}`);
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
