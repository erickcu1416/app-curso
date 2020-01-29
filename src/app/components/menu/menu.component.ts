import { AuthService } from './../../../services/auth.service';
import { MessagesController } from './../../../utils/controllers/messages.controller';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private messagesCtrl: MessagesController,
              private _authService: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  async tryLogOut() {
    this.messagesCtrl.presentLoader('Cerando sesión...');
    const res = await this._authService.doSignOut();
    setTimeout(() => {
      this.messagesCtrl.hideLoader();
      if (res) {
        this.router.navigateByUrl('/login');
      }
    }, 1000);
  }

}
