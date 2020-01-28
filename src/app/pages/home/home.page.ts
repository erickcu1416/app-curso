import { MessagesController } from './../../../utils/controllers/messages.controller';
import { IUser } from './../../../utils/models/user.interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: IUser;
  loader = true;

  constructor(private _authService: AuthService,
              private router: Router,
              private menssagesCtrl: MessagesController) {
  }

  async ngOnInit() {
    this.user = await this._authService.getUser();
    this.loader = false;
  }

  tryLogOut() {
    this.menssagesCtrl.presentLoader('Cerando sesión...');
    const res = this._authService.doSignOut();
    this.menssagesCtrl.hideLoader();
    if (res) {
      this.router.navigateByUrl('/login');
    }
  }
}
