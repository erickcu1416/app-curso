import { IUser } from './../utils/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

    getUserById(id): Observable<IUser> {
        return this.db.doc<IUser>(`${this.COLLECTION_END}/${id}`).valueChanges();
    }

    async addUserFirestore(user: IUser): Promise<IUser | any> {
        return new Promise(
            async (resolve, reject) => {
            console.log('Creando user desde repository', user);
            const id = user._id.toString();
            await this.usersCollection.doc(id).set(user).then(
                () => resolve(user),
                err => resolve(err)
            ).catch(
                e => reject(e)
            );
        });
    }

}
