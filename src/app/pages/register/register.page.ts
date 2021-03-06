import { MessagesController } from './../../../utils/controllers/messages.controller';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene no cumple con el minimo de caracteres' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida' },
    ],
    username: [
      { type: 'required', message: 'El nombre de usuario es necesario' },
      { type: 'minLength', mesaage: 'El nombre de usuario no cumple con el minimo de caracteres' },
      { type: 'maxLength', message: 'El nombre de usuario a pasado el limite de los caracteres' },
    ]
  };

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private _authService: AuthService,
              private messagesCtrl: MessagesController,
              private menuCtrl: MenuController) {
    this.registerForm = this.formBuilder.group(
      {
        password: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ]
        )),
        email: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          ]
        )),
        username: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ]
        ))
      }
    );
   }

  ngOnInit() {
  }

  async tryRegister(value) {
    console.log(value);
    this.messagesCtrl.presentLoader('Creando usuario...');
    const res = await this._authService.doRegister(value);
    this.messagesCtrl.hideLoader();
    if (res._id) {
      this.router.navigateByUrl('home');
    } else if (res.code) {
      this.messagesCtrl.presentAlertOk('', res.message);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
