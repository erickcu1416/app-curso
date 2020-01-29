import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private _authSerivce: AuthService,
              private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
      const us = await this._authSerivce.getUser();
      if (us._id) {
        return resolve(true);
      } else {
        this.router.navigateByUrl('login');
        return reject(false);
      }
    });
  }

}
