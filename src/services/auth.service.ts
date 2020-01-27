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

  doRegister(value: IUser) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(
        async res => {
          delete value.password;
          this._userRepository.addUserFirestore(value);
        }
      );
    });
  }
}
