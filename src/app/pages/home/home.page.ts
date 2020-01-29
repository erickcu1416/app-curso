import { FlowerService } from './../../../services/flower.service';
import { IFlower } from './../../../utils/models/flower.interface';
import { MessagesController } from './../../../utils/controllers/messages.controller';
import { IUser } from './../../../utils/models/user.interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: IUser;
  loader = true;
  flowers: Observable<IFlower[]>;

  constructor(private _authService: AuthService,
              private router: Router,
              private menssagesCtrl: MessagesController,
              private _flowerService: FlowerService,
              private menuCtrl: MenuController) {
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  async ngOnInit() {
    this.getFlowers();
    this.user = await this._authService.getUser();
    this.loader = false;
  }

  async tryLogOut() {
    this.menssagesCtrl.presentLoader('Cerando sesión...');
    const res = await this._authService.doSignOut();
    setTimeout(() => {
      this.menssagesCtrl.hideLoader();
      if (res) {
        this.router.navigateByUrl('/login');
      }
    }, 1000);
  }

  getFlowers() {
    this.flowers = this._flowerService.getFlowers();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
