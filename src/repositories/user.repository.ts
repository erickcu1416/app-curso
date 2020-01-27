import { IUser } from './../utils/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class UserRepository {
    private COLLECTION_END = 'users';

    private usersCollection: AngularFirestoreCollection<IUser>;

    constructor(private db: AngularFirestore) {
        console.log('User Repository Ready');
        this.usersCollection = this.db.collection<IUser>(`${this.COLLECTION_END}`);
    }

    async addUserFirestore(user: IUser): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
            const id = this.db.createId();
            user._id = id;
            console.log('Creando user desde repository', user);
            await this.usersCollection.doc(id).set(user).then(
                (a) => resolve(a),
                err => reject(err)
            );
        });
    }

}
