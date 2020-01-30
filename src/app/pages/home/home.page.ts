import { CartService } from './../../../services/cart.service';
import { FlowerService } from './../../../services/flower.service';
import { IFlower } from './../../../utils/models/flower.interface';
import { MessagesController } from './../../../utils/controllers/messages.controller';
import { IUser } from './../../../utils/models/user.interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: IUser;
  loader = true;
  flowers: Observable<IFlower[]>;
  cart: IFlower[] = [];

  constructor(private _authService: AuthService,
              private router: Router,
              private menssagesCtrl: MessagesController,
              private _flowerService: FlowerService,
              private menuCtrl: MenuController,
              public popoverController: PopoverController,
              private _cartService: CartService) {
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  async ngOnInit() {
    this.getFlowers();
    this.getCart();
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

  getCart() {
    this.cart = this._cartService.getCart();

  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async openProduct(fl: IFlower) {
    const quanty = await this.menssagesCtrl.presentAlertAddProduct();
    this._cartService.addFlower(fl, Number(quanty));
    this.cart = this._cartService.getCart();
  }
}
