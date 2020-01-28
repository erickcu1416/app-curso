import { UserRepository } from './../repositories/user.repository';
import { IUser } from './../utils/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private _userRepository: UserRepository) { }

  doRegister(user: IUser): Promise<IUser | any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        async res => {
          console.log('RES ON SERVICE', res);
          if (res.user) {
            user._id = res.user.uid;
            delete user.password;
            const us = await this._userRepository.addUserFirestore(user);
            if (us) {
              console.log('USER COMPLETE', us);
              resolve(us);
            } else {
              resolve(us);
            }
          }
        },
        err => resolve(err)
      ).catch(
        e => reject(e)
      );
    });
  }

  doLogin(user: IUser): Promise<IUser | any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
        async res => {
          console.log('RES', res);
          user._id = res.user.uid;
          delete user.password;
          resolve(user);
        },
        err => {
          console.log('ERRPR', err);
          resolve(err);
        }
      ).catch(
        e => reject(e)
      );
    });
  }
}
